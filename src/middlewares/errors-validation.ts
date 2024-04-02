import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

type ExErrType = {
  type: string,
  value: string,
  msg: string,
  path: string,
  location: string
}

const errorParser = (errorExpress: ExErrType[]) => ({
  errorsMessages: errorExpress.map((exErr) => ({
    field: exErr.path,
    message: exErr.msg
  }))
})

export const errorsValidation = (req: Request, res: Response, next: NextFunction) => {
  const expressErrors = validationResult(req).array() as ExErrType[]

  if (expressErrors.length) {
    const error = errorParser(expressErrors)
    console.log('error --------- ', expressErrors)
    res.status(400).json(error)
  } else {
    next()
  }
}