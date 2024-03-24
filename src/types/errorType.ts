export type ErrorType = {
  errorsMessages: ErrorsMessageType[]
}

export type ErrorsMessageType = {
  message: string
  field?: string
}