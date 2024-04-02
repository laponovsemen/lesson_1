import { body } from "express-validator";

export const lengthValid = (field: string, max?: number, min?: number) => (
  body(field)
    .trim()
    .notEmpty()
    .isLength({ max, min })
    .withMessage((min ? `min length is ${min} letters` : '') + (max ? `max length is ${max} letters` : ''))
)

// export const titleValid = () => body('title').trim().isLength({ max: 30 }).withMessage('max length is 30 letters')
// export const shortDescriptionValid = () => body('shortDescription').trim().isLength({ max: 100 }).withMessage('max length is 100 letters')
// export const contentValid = () => body('content').trim().isLength({ max: 1000 }).withMessage('max length is 1000 letters')