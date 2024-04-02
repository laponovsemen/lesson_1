import { body, check } from "express-validator";

type LengthValidType = {
  title: string,
  min?: number,
  max?: number,
}

export const lengthValid = ({title, min, max}: LengthValidType) => (
  body(title)
    .trim()
    .notEmpty()
    .isLength({ max, min })
    .withMessage((min ? `min length is ${min} letters` : '') + (max ? `max length is ${max} letters` : ''))
)

export const urlValid = (field: string) => (
  body(field)
    .trim()
    .matches('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
    .withMessage(('Invalid url'))
)
