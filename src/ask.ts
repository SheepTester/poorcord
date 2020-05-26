import * as readline from 'readline'

// Massive function header lol
export default async function * ask (question: string): AsyncGenerator<string, never, string | undefined> {
  const nextPromises: Promise<string>[] = []
  let nextPromiseDone: (answer: string) => void
  function addNextPromise () {
    nextPromises.push(new Promise(resolve => (nextPromiseDone = resolve)))
  }
  addNextPromise()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question(question, answer => {
    nextPromiseDone(answer)
    addNextPromise()
  })

  while (true) {
    const answer = await nextPromises.shift()
    if (answer !== undefined) yield answer
  }
}
