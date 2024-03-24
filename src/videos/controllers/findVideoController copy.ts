import { Request, Response } from 'express'
import { db } from '../../db/db'
import { OutputVideoType } from '../../db/video-db-type'

type ParamsType = {
  id: string
}

type ReqQueryType = string //? строка ?

export const findVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  if (req.params.id) {
    const findVideoById = db.videos.find((video) => video.id === +req.params.id)
    if (findVideoById) {
      res
        .status(200)
        .json(findVideoById)
    } else {
      res
        .status(404)
    }
  } else {
    res
      .status(400)
  }
}
