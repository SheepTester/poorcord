@preprocessor typescript

@{%
  import * as moo from 'moo'

  const lexer: moo.Lexer = moo.compile({
    keyword: ['pi', 'e']
  })

  // HACK
  interface LexerIntermediate {
    // This is a function rather than an arrow function which apparently
    // allows it to be casted
    formatError(token: NearleyToken): string

    reset: (chunk: string, info: any) => void
    next: () => NearleyToken | undefined
    save: () => any
    has: (tokenType: string) => boolean
  }

  // This will then be successfully converted to a NearleyLexer!
  const intermediateLexer: LexerIntermediate = lexer
%}

@lexer intermediateLexer

main -> _ expression _ {% data => data[1] %}

expression -> sum {% id %}

sum ->
    sum _ ("+" | "-") _ product {% ([a, , [type], , b]) => ({ type, a, b }) %}
  | product {% id %}

product ->
    product _ ("*" | "/" | "%") _ exponent {% ([a, , [type], , b]) => ({ type, a, b }) %}
  | product _ exponentNotNumber {% ([a, , b]) => ({ type: '*', a, b }) %}
  | exponent {% id %}

exponentNotNumber ->
    valueNotNumber _ "^" _ exponent {% ([base, , , , power]) => ({ type: '^', base, power }) %}
  | valueNotNumber {% id %}

exponent ->
    value _ "^" _ exponent {% ([base, , , , power]) => ({ type: '^', base, power }) %}
  | value {% id %}

value ->
    signedNumber {% id %}
  | valueNotNumber {% id %}

valueNotNumber ->
    variable {% id %}
  | function {% id %}
  | wrappedExpression {% id %}

signedNumber -> ("+" | "-"):? scientificNotation {% ([sign, number]) => (sign + number) %}

scientificNotation ->
    number {% id %}
  | number "e" [0-9]:+ {% data => data.join('') %}

number ->
    [0-9]:+ ("." [0-9]:*):? {% data => data.join('') %}
  | "." [0-9]:+ {% data => data.join('') %}

variable -> [a-z] {% ([variable]) => variable %}

function -> [a-zA-Z]:+ _ wrappedExpression {% ([fnName, , expression]) => ({
  type: 'fn' + fnName.join(''),
  expression
}) %}

wrappedExpression -> "(" _ expression _ ")" {% data => data[2] %}

_ -> [\s]:* {% () => null %}
