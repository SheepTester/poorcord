import { Parser, Grammar } from 'nearley'
import grammar from './grammar/test'

const parser = new Parser(Grammar.fromCompiled(grammar))
parser.feed('Say hello to Bob')
console.log(parser.results);
