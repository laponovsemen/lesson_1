import { Request, Response } from 'express'
import { videoRepository } from '../repositories/videoRepository'
import { OutputVideoType } from '../../types/videosTypes'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const deleteVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  const isDeleted = videoRepository.deleteVideo(+req.params.id);

  if (isDeleted) {
    res
    .sendStatus(204)
  } else {
    res
    .sendStatus(404)
  }
}
