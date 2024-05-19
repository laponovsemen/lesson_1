import { Request, Response } from 'express'
import { blogsRepository } from '../repositories/blogsRepository'
import { BlogType, InputBlogType } from '../../types/blogsType'

type ParamsType = {
  id: string
}
type ResBodyType = BlogType

export const updateBlogController = (req: Request<ParamsType, any, InputBlogType>, res: Response<ResBodyType>) => {
  const isUpdateBlog = blogsRepository.updateBlog(req.params.id, req.body)
  if(isUpdateBlog) {
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
