import * as readline from 'readline'

function nextQuestion (rl: readline.Interface, question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer)
    })
  })
}

// Massive function header lol
export default async function * ask (question: string, firstQuestion: string = question): AsyncGenerator<string, never, string | undefined> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  yield await nextQuestion(rl, firstQuestion)
  while (true) {
    yield await nextQuestion(rl, question)
  }
}
