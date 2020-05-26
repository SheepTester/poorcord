@preprocessor typescript

main -> _ expression _ {% data => data[1] %}

expression -> sum {% id %}

sum ->
    sum _ ("+" | "-") _ product {% data => ({ type: data[2][0], a: data[0], b: data[4] }) %}
  | product {% id %}

product ->
    product _ ("*" | "/" | "%") _ exponent {% data => ({ type: data[2][0], a: data[0], b: data[4] }) %}
  | product _ exponentNotNumber {% ([a, _, b]) => ({ type: '*', a, b }) %}
  | exponent {% id %}

exponentNotNumber ->
    valueNotNumber _ "^" _ exponent {% data => ({ type: '^', base: data[0], power: data[4] }) %}
  | valueNotNumber {% id %}

exponent ->
    value _ "^" _ exponent {% data => ({ type: '^', base: data[0], power: data[4] }) %}
  | value {% id %}

value ->
    number {% id %}
  | valueNotNumber {% id %}

valueNotNumber ->
    variable {% id %}
  | function {% id %}
  | wrappedExpression {% id %}

number -> ("+" | "-"):? [0-9]:+ {% ([_, number]) => +(number) %}

variable -> [a-zA-Z] {% ([variable]) => variable %}

function -> [a-zA-Z]:+ _ wrappedExpression {% ([fnName, _, expression]) => ({
  type: 'fn' + fnName.join(''),
  expression
}) %}

wrappedExpression -> "(" _ expression _ ")" {% data => data[2] %}

_ -> [\s]:* {% () => null %}
