// Generated automatically by nearley, version 2.19.3
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

interface NearleyToken {  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "main$string$1", "symbols": [{"literal":"S"}, {"literal":"a"}, {"literal":"y"}], "postprocess": (d) => d.join('')},
    {"name": "main$string$2", "symbols": [{"literal":"h"}, {"literal":"e"}, {"literal":"l"}, {"literal":"l"}, {"literal":"o"}], "postprocess": (d) => d.join('')},
    {"name": "main$string$3", "symbols": [{"literal":"t"}, {"literal":"o"}], "postprocess": (d) => d.join('')},
    {"name": "main", "symbols": ["main$string$1", "_", "main$string$2", "_", "main$string$3", "_", "name"], "postprocess": data => data[6]},
    {"name": "name$ebnf$1", "symbols": []},
    {"name": "name$ebnf$1", "symbols": ["name$ebnf$1", /[a-z]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "name", "symbols": [/[A-Z]/, "name$ebnf$1"], "postprocess": data => data[0] + data[1].join('')},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null}
  ],
  ParserStart: "main",
};

export default grammar;
