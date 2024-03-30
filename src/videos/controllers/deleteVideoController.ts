import { Request, Response } from 'express'
import { OutputVideoType } from '../types/videos-types'
import { videoRepository } from '../repositories/videoRepository'

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
