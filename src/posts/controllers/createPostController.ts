import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { postRepository } from '../repositories/postRepository';
import { CreateUpdatePostType, PostType } from '../../types/postsTypes';

type ResBodyType = PostType | ErrorType

export const createPostController = (req: Request<any, any, CreateUpdatePostType>, res: Response<ResBodyType>) => {
  const inputPost = req.body;
  const error = {errorsMessages: []}

  if (error.errorsMessages.length === 0) {
    const newPost = postRepository.createPost(inputPost)
    res
      .status(201)
      .json(newPost)
  } else {
    res
      .status(400)
      .json(error)
  }
}
