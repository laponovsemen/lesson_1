import { Request, Response } from 'express'
import { dbLocal } from '../../db/db'
import { OutputVideoType } from '../../types/videosTypes'

export const getVideosController = (req: Request, res: Response<OutputVideoType[]>) => {
  res
    .status(200)
    .json(dbLocal.videos)
}