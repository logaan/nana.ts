import { alt, alt_sc, buildLexer, expectEOF, expectSingleResult, list, rep_sc, rule, seq, str, Token } from 'typescript-parsec'
import { apply, tok } from 'typescript-parsec'

console.log("Start")

enum TokenKind {
    MacroName,
    Name,
    Hole,
    Number,
    Whitespace,
    String,
    LBrace,
    RBrace,
}

const lexer = buildLexer([
    [true, /^[A-Z][A-Za-z]*/g, TokenKind.MacroName],
    [true, /^[a-z][a-z0-9:\/<>-]*(@[0-9]+\.[0-9]+\.[0-9]+)?/g, TokenKind.Name],
    [true, /^_/g, TokenKind.Hole],
    [true, /^\d+(\.\d+)/g, TokenKind.Number],
    [true, /^"[^"]*"/g, TokenKind.String],
    [true, /^\[/g, TokenKind.LBrace],
    [true, /^\]/g, TokenKind.RBrace],
    [false, /^\s+/g, TokenKind.Whitespace],
])

type MacroName = { tag: "macro-name", value: string }
type Name = { tag: "name", value: string }
type Hole = { tag: "hole" }
type Exp = MacroName | Name | Hole | number | string | Array<Exp>
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

function applyList(values: [Token<TokenKind>, Exps, Token<TokenKind>]): Exps {
    return values[1]
}


const MACRONAME = rule<TokenKind, MacroName>()
const NAME = rule<TokenKind, Name>()
const HOLE = rule<TokenKind, Hole>()
const NUMBER = rule<TokenKind, number>()
const EXP = rule<TokenKind, Exp>()
const EXPS = rule<TokenKind, Exps>()
const LIST = rule<TokenKind, Exps>()

MACRONAME.setPattern(apply(tok(TokenKind.MacroName), applyMacroName))
NAME.setPattern(apply(tok(TokenKind.Name), applyName))
HOLE.setPattern(apply(tok(TokenKind.Hole), applyHole))
NUMBER.setPattern(apply(tok(TokenKind.Number), applyNumber))

LIST.setPattern(apply(seq(str("\["), EXPS, str("\]")), applyList))

EXP.setPattern(alt_sc(MACRONAME, NAME, HOLE, NUMBER, LIST))
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
`))
