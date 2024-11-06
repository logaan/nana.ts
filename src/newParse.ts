import { buildLexer, expectEOF, expectSingleResult, rule, Token } from 'typescript-parsec';
import { alt, apply, list_sc, str, tok } from 'typescript-parsec';

enum TokenKind {
    Number,
    Comma,
    Space,
}

const lexer = buildLexer([
    [true, /^\d+(\.\d+)?/g, TokenKind.Number],
    [true, /^\,/g, TokenKind.Comma],
    [false, /^\s+/g, TokenKind.Space]
]);

function applyNumber(value: Token<TokenKind.Number>): number {
    return +value.text;
}


const TERM = rule<TokenKind, number>();

TERM.setPattern(
    apply(tok(TokenKind.Number), applyNumber)
);

const numberListParser = list_sc(TERM, str(','));

function evaluate(expr: string): number[] {
    return expectSingleResult(expectEOF(numberListParser.parse(lexer.parse(expr))));
}

console.log(evaluate('1,2, 3, 4  ,  5  '));