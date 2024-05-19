import { Request, Response } from 'express'
import { blogsRepository } from '../repositories/blogsRepository'
import { BlogType } from '../../types/blogsType'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getBlogController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response<BlogType>) => {  
  const findBlog = await blogsRepository.findBlogById(req.params.id)

  if (findBlog) {
    res
      .status(200)
      .json(findBlog)
  } else {
    res
      .sendStatus(404)
  }
}
