import { Request, Response } from 'express'
import { CreateUpdatePostType, PostType } from '../../types/postsTypes'
import { postRepository } from '../repositories/postRepository'

type ParamsType = {
  id: string
}
type ResBodyType = PostType

export const updatePostController = (req: Request<ParamsType, any, CreateUpdatePostType>, res: Response<ResBodyType>) => {
  const isUpdatePost = postRepository.updatePost(req.params.id, req.body)
  if(isUpdatePost) {
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
