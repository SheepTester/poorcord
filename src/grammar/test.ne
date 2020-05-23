@preprocessor typescript

main -> "Say" _ "hello" _ "to" _ name {% data => data[6] %}

name -> [A-Z] [a-z]:* {% data => data[0] + data[1].join('') %}

_ -> [\s]:* {% () => null %}
