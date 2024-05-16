import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { postRepository } from '../repositories/postRepository';
import { CreateUpdatePostType, PostDBType, PostType } from '../../types/postsTypes';
import { postCollection } from '../../db/db';

type ResBodyType = PostType| null | ErrorType

export const createPostController = async (req: Request<any, any, CreateUpdatePostType>, res: Response<ResBodyType>) => {
  const inputPost = req.body;
  const error = {errorsMessages: []}
  console.log('-------------------------------------------- ', error.errorsMessages);

  if (error.errorsMessages.length === 0) {
    const createdInfo = await postRepository.createPost(inputPost)
console.log('createPostController => createdInfo  ', createdInfo);

    if(!createdInfo.id){
      res
      .status(500)
      .json(error)
    } else {
      const newPost = await postRepository.findForOutput(createdInfo.id)
      console.log('create Post', newPost);
      
      res
        .status(201)
        .json(newPost)
    }
  } else {
    res
      .status(400)
      .json(error)
  }
}
