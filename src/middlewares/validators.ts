import { ValidationChain, body } from "express-validator";

type LengthValidType = {
  title: string,
  min?: number,
  max?: number,
}

export const lengthValid = ({title, min, max}: LengthValidType): ValidationChain => (
  body(title)
    .trim()
    .notEmpty()
    .isLength({ max, min })
    .withMessage((min ? `min length is ${min} letters` : '') + (max ? `max length is ${max} letters` : ''))
)

export const urlValid = (field: string): ValidationChain => (
  body(field)
    .trim()
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    .withMessage(('Invalid url'))
)

export const isString = (field: string): ValidationChain => (
  body(field)
    .isString()
    .trim()
    .withMessage((field + ' must be string'))
)
