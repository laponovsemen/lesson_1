import { Request, Response } from 'express'
import { db } from '../../db/db'
import { PostType } from '../../videos/types/posts-types'

export const getPostsController = (req: Request, res: Response<PostType[]>) => {
  res
    .status(200)
    .json(db.posts)
}