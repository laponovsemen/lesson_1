import { Request, Response } from 'express'
import { db } from '../../db/db'
import { OutputVideoType } from '../types/videos-types'
import { videoRepository } from '../repositories/videoRepository'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const getVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  const findVideo = videoRepository.findVideoById(+req.params.id)

  if (findVideo) {
    res
      .status(200)
      .json(findVideo)
  } else {
    res
      .sendStatus(404)
  }
}
