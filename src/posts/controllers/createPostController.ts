import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { CreatePostType, PostType } from '../../types/posts-types';
import { postRepository } from '../repositories/postRepository';

type ResBodyType = PostType | ErrorType

export const createPostController = (req: Request<any, any, CreatePostType>, res: Response<ResBodyType>) => {
  const inputPost = req.body;
  // const error = videoValidator(TypeRequestEnum.createVideo, inputVideo)
  const error = {errorsMessages: []}

  if (error.errorsMessages.length === 0) {
    const newVideo = postRepository.createPost(inputPost)
    res
      .status(201)
      .json(newVideo)
  } else {
    res
      .status(400)
      .json(error)
  }
}
