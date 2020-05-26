import { Parser, Grammar } from 'nearley'
import expressionRules from './grammar/math-expression-lexer'
import ask from './ask'

type Variable = string

enum Op { '+' = '+', '-' = '-', '*' = '*', '/' = '/', '%' = '%' }

interface Operation {
  type: Op
  a: Expression
  b: Expression
}

interface Exponent {
  type: '^'
  base: Expression
  power: Expression
}

interface Function {
  type: string
  expression: Expression
}

type Expression = number | Variable | Operation | Exponent | Function

function isOperation (x: any): x is Operation {
  return 'type' in x && 'a' in x && 'b' in x && Op.hasOwnProperty(x.type)
}

function isExponent (x: any): x is Exponent {
  return 'type' in x && 'base' in x && 'power' in x && x.type === '^'
}

function isFunction (x: any): x is Function {
  return 'type' in x && 'expression' in x && x.type.startsWith('fn')
}

function evaluate (expression: Expression): number {
  if (typeof expression === 'number') {
    return expression
  } else if (typeof expression === 'string') {
    switch (expression) {
      case 'pi': return Math.PI
      case 'e': return Math.E
      default: throw new ReferenceError(`Unknown variable ${expression}`)
    }
  } else if (isOperation(expression)) {
    const a: number = evaluate(expression.a)
    const b: number = evaluate(expression.b)
    switch (expression.type) {
      case Op['+']: return a + b
      case Op['-']: return a - b
      case Op['*']: return a * b
      case Op['/']: return a / b
      case Op['%']: return a % b
      default: throw new Error(`Unknown operation ${expression.type}`)
    }
  } else if (isExponent(expression)) {
    return Math.pow(evaluate(expression.base), evaluate(expression.power))
  } else if (isFunction(expression)) {
    const input: number = evaluate(expression.expression)
    switch (expression.type) {
      case 'fnsqrt': return Math.sqrt(input)
      case 'fnsin': return Math.sin(input)
      case 'fncos': return Math.cos(input)
      case 'fntan': return Math.tan(input)
      default: throw new ReferenceError(`Unknown function ${expression.type}`)
    }
  } else {
    throw new Error(`What\n${JSON.stringify(expression, null, 2)}`)
  }
}

async function main (): Promise<void> {
  const grammar = Grammar.fromCompiled(expressionRules)
  for await (const expression of ask('Evaluate: ')) {
    try {
      const parser = new Parser(grammar)
      parser.feed(expression)
      parser.finish()
      console.log(evaluate(parser.results[0]) + '\n')
    } catch (err) {
      console.error(err)
      console.log()
    }
  }
}

main()
  .catch((err: Error) => {
    console.error(err)
    process.exit()
  })
