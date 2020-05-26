import { Parser, Grammar } from 'nearley'
import * as grammars from './grammars'
import ask from './ask'

type GrammarID = keyof typeof grammars

function isGrammar (grammarID: string): grammarID is GrammarID {
  return grammars.hasOwnProperty(grammarID)
}

async function main (): Promise<void> {
  const answers = ask('Input: ')
  const { value: grammarID } = await answers.next(`Which grammar to use? (${Object.keys(grammars).join(', ')})`)
  if (isGrammar(grammarID)) {
    const parser = new Parser(Grammar.fromCompiled(grammars[grammarID]))
    for await (const input of answers) {
      parser.feed(input)
    }
    // For some reason TypeScript doesn't recognize that `ask` never returns,
    // but whatever
  } else {
    throw new Error('That is not a valid grammar ID!')
  }
}

main()
  .catch((err: boolean) => {
    console.log(err)
  })
