import { ValidationChain, body } from "express-validator";
import { db } from "../db/db";
import { blogsRepository } from "../Blogs/repositories/blogsRepository";

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


export const forBlogId = (field: string): ValidationChain => {
  return body(field)
    .custom( async (value) => {
      if (typeof value !== 'string') {
        throw new Error(field + ' must be string');
      }
      const findBlogById = blogsRepository.findBlogById(value)?.id
      if (!findBlogById) {
        throw new Error(field + ' not found');
      }
    })
}
