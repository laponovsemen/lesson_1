import { Request, Response } from 'express'
import { blogsRepository } from '../repositories/blogsRepository'
import { BlogType } from '../../types/blogsType'

export const getBlogsController = async (req: Request, res: Response<BlogType[]>) => {
  const blogs = await blogsRepository.getBlogs()

  res
    .status(200)
    .json(blogs)
}