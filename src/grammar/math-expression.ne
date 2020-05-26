@preprocessor typescript

main -> _ expression _ {% ([, expression]) => expression %}

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

signedNumber -> sign scientificNotation {% ([sign, number]) => +((sign || '') + number) %}

scientificNotation ->
    number {% id %}
  | number "e" sign [0-9]:+ {% data => data.join('') %}

sign -> ("+" | "-"):?

number ->
    [0-9]:+ ("." [0-9]:*):? {% data => data.join('') %}
  | "." [0-9]:+ {% data => data.join('') %}

variable -> [a-zA-Z] {% ([variable]) => variable %}

function -> [a-zA-Z]:+ _ wrappedExpression {% ([fnName, , expression]) => ({
  type: 'fn' + fnName.join(''),
  expression
}) %}

wrappedExpression -> "(" _ expression _ ")" {% ([, , expression]) => expression %}

_ -> [\s]:* {% () => null %}
