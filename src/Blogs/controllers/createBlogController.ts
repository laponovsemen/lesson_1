import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { BlogType, InputBlogType } from '../../types/blogsType';
import { blogsRepository } from '../repositories/blogsRepository';

type ResBodyType = BlogType | ErrorType

export const createBlogController = async (req: Request<any, any, InputBlogType>, res: Response<ResBodyType>) => {
  const newBlog = await blogsRepository.createBlog(req.body)
  if (newBlog) {
    res
      .status(201)
      .json(newBlog)
    } else {
    res
      .sendStatus(500)
  }
}
