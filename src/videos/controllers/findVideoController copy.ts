import { Request, Response } from 'express'
import { db } from '../../db/db'
import { OutputVideoType } from '../types/videos-types'

type ParamsType = {
  id: string
}

type ReqQueryType = string //? строка ?

export const findVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  console.log('req.params.id', req.params.id);
  
  if (req.params.id) {
    console.log('db.videos  ', db.videos);
    const findVideoById = db.videos.find((video) => video.id === +req.params.id)
    console.log('findVideoById  ', findVideoById);
    if (findVideoById) {
      res
        .status(200)
        .json(findVideoById)
    } else {
      res
        .sendStatus(404)
    }
  } else {
    res
      .sendStatus(400)
  }
}
