@preprocessor typescript

@{%
import * as moo from 'moo'
import { LexerIntermediate } from '../lexer-intermediate'

const lexer: LexerIntermediate = moo.compile({
  ws:     /[ \t]+/,
  number: /[0-9]+/,
  word: /[a-z]+/,
  times:  /\*|x/
})
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

# Use %token to match any token of that type instead of "token":
multiplication -> %number %ws %times %ws %number {% ([first, , , , second]) => first * second %}

# Literal strings now match tokens with that text:
# NOTE: Apparently this gets ignored
trig -> "sin" %number
