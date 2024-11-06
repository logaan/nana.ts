import { alt, alt_sc, buildLexer, expectEOF, expectSingleResult, list, rep_sc, rule, seq, str, Token } from 'typescript-parsec'
import { apply, tok } from 'typescript-parsec'

console.log("Start")

enum TokenKind {
    MacroName,
    // TODO: Name should probably be like 3 different things. One PackageName,
    // WorldName, InterfaceName, ImportPath, Type, etc. match the WIT grammar:
    // https://github.com/WebAssembly/component-model/blob/main/design/mvp/WIT.md
    Name,
    Hole,
    Number,
    Whitespace,
    String,
    LBracket,
    RBracket,
    LParen,
    RParen,
    LBrace,
    RBrace,
    DoubleQuote,
}

const lexer = buildLexer([
    [true, /^[A-Z][A-Za-z]*/g, TokenKind.MacroName],
    [true, /^[a-z][a-z0-9:\/\.<>-]*(@[0-9]+\.[0-9]+\.[0-9]+)?/g, TokenKind.Name],
    [true, /^_/g, TokenKind.Hole],
    [true, /^\d+(\.\d+)?/g, TokenKind.Number],
    [true, /^"[^"]*"/g, TokenKind.String],
    [true, /^\[/g, TokenKind.LBracket],
    [true, /^\]/g, TokenKind.RBracket],
    [true, /^\(/g, TokenKind.LParen],
    [true, /^\)/g, TokenKind.RParen],
    [true, /^"/g, TokenKind.RParen],
    [false, /^\s+/g, TokenKind.Whitespace],
])

type MacroName = { tag: "macro-name", value: string }
type Name = { tag: "name", value: string }
type Hole = { tag: "hole" }
type Tuple = { tag: "tuple", values: Exp[] }
type Exp = MacroName | Name | Hole | number | string | Array<Exp> | Tuple
type Exps = Exp[]

function applyMacroName(value: Token<TokenKind.MacroName>): MacroName {
    return { tag: "macro-name", value: value.text }
}

function applyName(value: Token<TokenKind.Name>): Name {
    return { tag: "name", value: value.text }
}

function applyHole(value: Token<TokenKind.Hole>): Hole {
    return { tag: "hole" }
}

function applyNumber(value: Token<TokenKind.Number>): number {
    return +value.text
}

function applyString(value: Token<TokenKind.String>): string {
    return value.text.slice(1, -1)
}

function applyList(values: [Token<TokenKind>, Exps, Token<TokenKind>]): Exps {
    return values[1]
}

function applyTuple(values: [Token<TokenKind>, Exps, Token<TokenKind>]): Tuple {
    return { tag: "tuple", values: values[1] }
}


const MACRONAME = rule<TokenKind, MacroName>()
const NAME = rule<TokenKind, Name>()
const HOLE = rule<TokenKind, Hole>()
const NUMBER = rule<TokenKind, number>()
const STRING = rule<TokenKind, string>()
const EXP = rule<TokenKind, Exp>()
const EXPS = rule<TokenKind, Exps>()
const LIST = rule<TokenKind, Exps>()
const TUPLE = rule<TokenKind, Tuple>()

MACRONAME.setPattern(apply(tok(TokenKind.MacroName), applyMacroName))
NAME.setPattern(apply(tok(TokenKind.Name), applyName))
HOLE.setPattern(apply(tok(TokenKind.Hole), applyHole))
NUMBER.setPattern(apply(tok(TokenKind.Number), applyNumber))
STRING.setPattern(apply(tok(TokenKind.String), applyString))

LIST.setPattern(apply(seq(str("\["), EXPS, str("\]")), applyList))
TUPLE.setPattern(apply(seq(str("\("), EXPS, str("\)")), applyTuple))

EXP.setPattern(alt_sc(MACRONAME, NAME, HOLE, NUMBER, STRING, LIST, TUPLE))
EXPS.setPattern(rep_sc(EXP))

function evaluate(expr: string): Exps {
    return expectSingleResult(expectEOF(EXPS.parse(lexer.parse(expr))))
}

console.log("Before calling evaluate")

console.log(evaluate(`
Package nana:examples@0.0.1

World fizzbuzz [
  Import wasi:cli/stdout
  Import wasi:streams/output-stream

  Export print-fizzbuzz [max u8] _
]

Func num-to-txt [num u8] string
  Match[mod(num 3) mod(num 5)]
    [[0 0] "Fizzbuzz"
     [0 _] "Fizz"
     [_ 0] "Buzz"
     [_ _] n]

Func list-to-txt [list list<u8>] list<string>
  map(num-to-text list)

Func print-fizzbuzz [max u8] _
  Let[lines  list-to-text(range(1 100))
      stdout stdout/get-stdout()]
    For[line lines]
      stdout.write(line)

`))
