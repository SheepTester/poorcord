// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/moo/index.d.ts
interface Token {
  toString(): string
  type?: string
  value: string
  offset: number
  text: string
  lineBreaks: number
  line: number
  col: number
}

interface NearleyToken {
  value: any
  [key: string]: any
  // offset: any; text: any; lineBreaks: any; line: any; col: any
}

function usesToken (token: Token) {
  acceptsNearleyToken(token)
}

function acceptsNearleyToken (token: NearleyToken) {
  console.log(token)
}

interface Lexer {
  formatError(token: Token, message?: string): string
}

interface NearleyLexer {
  formatError: (token: NearleyToken) => string
}

interface NearleyLexer2 {
  formatError(token: NearleyToken): string
}

function usesLexer (lexer: Lexer) {
  // acceptsNearleyLexer(lexer) // Errs:
  // Argument of type 'Lexer' is not assignable to parameter of type 'NearleyLexer'.
  //   Types of property 'formatError' are incompatible.
  //     Type '(token: Token, message?: string | undefined) => string' is not assignable to type '(token: NearleyToken) => string'.
  //       Types of parameters 'token' and 'token' are incompatible.
  //         Type 'NearleyToken' is missing the following properties from type 'Token': offset, text, lineBreaks, line, col
  acceptsNearleyLexer2(lexer)
}

function acceptsNearleyLexer (lexer: NearleyLexer) {
  console.log(lexer)
}

function acceptsNearleyLexer2 (lexer: NearleyLexer2) {
  console.log(lexer)
}

function acceptsAndUsesNearleyLexer2 (lexer: NearleyLexer2) {
  acceptsNearleyLexer(lexer)
}
