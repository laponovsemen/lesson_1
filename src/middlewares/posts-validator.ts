import { body, check } from "express-validator";

export const lengthValid = ({title, min, max}: LengthValidType) => (
  body(title)
    .trim()
    .notEmpty()
    .isLength({ max, min })
    .withMessage((min ? `min length is ${min} letters` : '') + (max ? `max length is ${max} letters` : ''))
)
type LengthValidType = {
  title: string,
  min?: number,
  max?: number,
}
// export const lengthValid = (fieldArr: LengthValidType[]) => {
//   fieldArr.forEach(({title, min, max}) => {
//     return body(title)
//       .trim()
//       .notEmpty()
//       .isLength({ max, min })
//       .withMessage((min ? `min length is ${min} letters` : '') + (max ? `max length is ${max} letters` : ''))
//   })
// }

export const checkField = (field: string, errorMessage: string) => check(field, errorMessage)
// export const titleValid = () => body('title').trim().isLength({ max: 30 }).withMessage('max length is 30 letters')
// export const shortDescriptionValid = () => body('shortDescription').trim().isLength({ max: 100 }).withMessage('max length is 100 letters')
// export const contentValid = () => body('content').trim().isLength({ max: 1000 }).withMessage('max length is 1000 letters')