import { Request, Response } from 'express'
import { db, setDB } from '../../db/db'
import { OutputVideoType } from '../types/videos-types';
import { videoValidator } from '../../validators/validators';
import { TypeRequestEnum } from '../enums/videos-enum';
import { ErrorType } from '../../types/errorType';

type ParamsType = {
  id: string
}
type ResBodyType = OutputVideoType

export const updateVideoController = (req: Request<ParamsType, any, OutputVideoType>, res: Response<ResBodyType | ErrorType>) => {

  const inputVideo = req.body;
  const error = videoValidator(TypeRequestEnum.updateVideo, inputVideo)
  let isUpdateVideo = false

  if (error.errorsMessages.length === 0 && req.params.id) {
    const updatedVideos = db.videos.map((video) => {
      if (video.id === +req.params.id) {
        isUpdateVideo = true
        return inputVideo
      }
      return {
        ...video,
        id: +req.params.id
      }
    })
    setDB({videos: updatedVideos})

    if (isUpdateVideo) {
      res
        .status(201)
        .json(inputVideo)
    } else {
      res
        .sendStatus(404)
    }
  } else {
    res
      .status(400)
      .json(error)
  }
}
