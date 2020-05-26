@preprocessor typescript

# The worst has been confirmed:
# https://stackoverflow.com/a/53894091
# I must commit to a lexer; there is no mixing allowed

@{%
  import * as moo from 'moo'
  import { LexerIntermediate } from '../lexer-intermediate'

  // This will then be successfully converted to a NearleyLexer!
  const lexer: LexerIntermediate = moo.compile({
    whitespace: /[ \t]+/,
    number: /(?:\+|-)?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e(?:\+|-)?[0-9]+)?/,
    constant: ['pi', 'e'],
    functionName: ['sqrt', 'sin', 'cos', 'tan'],
    variable: /[a-zA-Z]/,
    sumOp: ['+', '-'],
    productOp: ['*', '/', '%'],
    exponentOp: ['^']
  })
%}

@lexer lexer

main -> _ expression _ {% ([, expression]) => expression %}

expression -> sum {% id %}

sum ->
    sum _ %sumOp _ product {% ([a, , [{ text: type }], , b]) => ({ type, a, b }) %}
  | product {% id %}

product ->
    product _ %productOp _ exponent {% ([a, , [{ text: type }], , b]) => ({ type, a, b }) %}
  | product _ exponentNotNumber {% ([a, , b]) => ({ type: '*', a, b }) %}
  | exponent {% id %}

exponentNotNumber ->
    valueNotNumber _ %exponentOp _ exponent {% ([base, , { text: type }, , power]) => ({ type, base, power }) %}
  | valueNotNumber {% id %}

exponent ->
    value _ %exponentOp _ exponent {% ([base, , { text: type }, , power]) => ({ type, base, power }) %}
  | value {% id %}

value ->
    %number {% ([{ text }]) => +text %}
  | valueNotNumber {% id %}

valueNotNumber ->
    %variable {% ([{ text }]) => text %}
  | %constant {% ([{ text }]) => text %}
  | function {% id %}
  | wrappedExpression {% id %}

function -> %functionName _ wrappedExpression {% ([{ text }, , expression]) => ({
  type: 'fn' + text.join(''),
  expression
}) %}

wrappedExpression -> "(" _ expression _ ")" {% ([, , expression]) => expression %}

_ -> %whitespace:? {% () => null %}
