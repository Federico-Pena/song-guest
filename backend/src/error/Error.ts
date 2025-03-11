export class ErrorSocket extends Error {
  message: string
  constructor(message: string, name?: string) {
    super(message)
    this.message = message
    const error = new Error(message)
    error.name = name || 'ErrorSocket'
    return error
  }
}
