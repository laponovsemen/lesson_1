import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { BlogType, CreateUpdateBlogType } from '../../types/blogsType';
import { blogsRepository } from '../repositories/blogsRepository';

type ResBodyType = BlogType | ErrorType

export const createBlogController = (req: Request<any, any, CreateUpdateBlogType>, res: Response<ResBodyType>) => {
  const newBlog = blogsRepository.createBlog(req.body)
  res
    .status(201)
    .json(newBlog)
}
