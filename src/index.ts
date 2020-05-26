import { Parser, Grammar } from 'nearley'
import * as grammars from './grammars'
import ask from './ask'

type GrammarID = keyof typeof grammars

function isGrammar (grammarID: string): grammarID is GrammarID {
  return grammars.hasOwnProperty(grammarID)
}

async function main (): Promise<void> {
  const answers = ask('Input: ', `Which grammar to use?\n${
    Object.keys(grammars).map(id => `- ${id}\n`).join('')
  }`)
  const { value: grammarID } = await answers.next()
  if (isGrammar(grammarID)) {
    const grammar: Grammar = Grammar.fromCompiled(grammars[grammarID])
    for await (const input of answers) {
      try {
        const parser = new Parser(grammar)
        parser.feed(input)
        parser.finish()
        console.log(JSON.stringify(parser.results, null, 2) + '\n')
      } catch (err) {
        console.error(err)
      }
    }
    // For some reason TypeScript doesn't recognize that `ask` never returns,
    // but whatever
  } else {
    throw new Error('That is not a valid grammar ID!')
  }
}

main()
  .catch((err: Error) => {
    console.error(err)
    process.exit()
  })
