export interface LexerIntermediate {
  // This is a function rather than an arrow function which apparently
  // allows it to be casted
  formatError(token: NearleyToken): string

  reset: (chunk: string, info: any) => void
  next: () => NearleyToken | undefined
  save: () => any
  has: (tokenType: string) => boolean
}
