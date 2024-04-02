import { Request, Response } from 'express'
import { blogsRepository } from '../repositories/blogsRepository'
import { BlogType } from '../../types/blogsType'

export const getBlogsController = (req: Request, res: Response<BlogType[]>) => {
  res
    .status(200)
    .json(blogsRepository.getBlogs())
}