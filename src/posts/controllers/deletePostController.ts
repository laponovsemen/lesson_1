import { Request, Response } from 'express'
import { OutputVideoType } from '../../types/videos-types'
import { postRepository } from '../repositories/postRepository'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const deletePostController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  const isDeleted = postRepository.deletePost(req.params.id);

  if (isDeleted) {
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
