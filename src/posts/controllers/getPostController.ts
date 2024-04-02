import { Request, Response } from 'express'
import { PostType } from '../../types/postsTypes'
import { postRepository } from '../repositories/postRepository'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getPostController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<PostType>) => {  
  const findPost = postRepository.findPostById(req.params.id)

  if (findPost) {
    res
      .status(200)
      .json(findPost)
  } else {
    res
      .sendStatus(404)
  }
}
