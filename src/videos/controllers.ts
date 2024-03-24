import { Request, Response } from 'express'
import { db } from '../db/db'
import { InputVideoType } from '../db/video-db-type'

export type ParamsType = {
  id: string // 
}
export type ResBodyType = any[]
export type ResQueryType = any[]

export const getVideosController = (req: Request<ParamsType, any, ResQueryType>, res: Response<any>) => {
  res
    .status(200)
    .json(db.videos)
}


