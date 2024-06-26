import { Request, Response } from 'express'
import { videoRepository } from '../repositories/videoRepository'
import { OutputVideoType } from '../../types/videosTypes'

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
