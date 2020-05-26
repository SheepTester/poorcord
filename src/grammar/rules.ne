@preprocessor typescript

units[SINGULAR, PLURAL] -> "1" _ $SINGULAR | countingNumNotOne _ $PLURAL

main -> (script _):* script

script -> "When" _ condition "," _ sequence

condition ->
    subject _ "joins" _ "the" _ "server"
  | subject _ "says," _ conditionString

conditionString -> "\"" ([^"\\\[] | "\\" [^"] | blankInput):* "\""

blankInput -> "[" type "," _ "whom" _ "we" _ "shall" _ "name" _ name

type -> "a byte" | "an integer"

sequence ->
    command "."
  | command _ "and" _ command "."
  | (command "," _):+ command "," _ "and" _ command "."

command ->
    "give" _ object _ "the" _ roleName _ "role"
  | "DM" _ object _ "hello"
  | "dance"
  | "prepare" _ "a" _ "tape" _ "named" _ name _
      "of" _ "precisely" _ units["byte", "bytes"]
  | "store" _ object _ "in" _ object "'s" _ "byte" _ "#" countingNum
  | "conceptualize" _ bfCode _ "with" _ object
  | "have" _ object _ "collect" _ "the" _ "waste"
  | "tell" _ object _ "about" _ object

roleName -> [^,]:+ | string

string -> "\"" ([^"\\\[] | "\\" [^"]):* "\""

bfCode -> [<>+\-,.\[\]\s]:+

subject -> name | "she" | "he" | "they"

object -> name | "her" | "him" | "them"

name -> [A-Z] [a-z]:*

countingNum -> [0-9]:+

countingNumNotOne -> "1" [0-9]:+ | [02-9] [0-9]:*

# Obligatory whitespace
_ -> [\s]:+ {% () => null %}
