import { Request, Response } from 'express'
import { PostType } from '../../types/postsTypes'
import { postRepository } from '../repositories/postRepository'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getPostController = async (req: Request<ParamsType, any, ReqQueryType>, res: Response<PostType>) => {
  const findedPost = await postRepository.findForOutput(req.params.id)

  if (findedPost) {
    res
      .status(200)
      .json(findedPost)
  } else {
    res
      .sendStatus(404)
  }
}
