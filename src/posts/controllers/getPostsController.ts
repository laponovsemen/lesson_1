import { Request, Response } from 'express'
import { PostType } from '../../types/postsTypes'
import { postRepository } from '../repositories/postRepository'

export const getPostsController = (req: Request, res: Response<PostType[]>) => {
  res
    .status(200)
    .json(postRepository.getPosts())
}