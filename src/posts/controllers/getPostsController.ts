import { Request, Response } from 'express'
import { postRepository } from '../repositories/postRepository'
import { PostType } from '../../types/postsTypes'

export const getPostsController = async (req: Request, res: Response<PostType[]>) => {
  const allPosts = await postRepository.getPosts()
  res
    .status(200)
    .json(allPosts)
}