import { Request, Response } from 'express'
import { db } from '../../db/db'
import { InputForUpdateVideoType, OutputVideoType } from '../types/videos-types';
import { ErrorType } from '../../types/errorType';

type ParamsType = {
  id: string
}
type ResBodyType = OutputVideoType | ErrorType

export const updateVideoController = (req: Request<ParamsType, any, InputForUpdateVideoType>, res: Response<ResBodyType>) => {

  const inputVideo = req.body;
  const isRequerFields = inputVideo.title && inputVideo.author
  let isUpdateVideo = false

  if (isRequerFields && req.params.id) {
    db.videos.map((video) => {
      if (video.id === +req.params.id) {
        isUpdateVideo = true
        return {
          ...video,
          ...inputVideo
        }
      }
      return video
    })

    if (isUpdateVideo) {
      res
        .sendStatus(204)
    } else {
      res
        .sendStatus(404)
    }
  } else {
    res
      .status(400)
      .json(updateVideoValidator(+req.params.id, inputVideo))
  }
}

// const createNewVideo = (videoData: InputVideoType): OutputVideoType => {
//   return {
//     id: Date.now() + Math.random(),
//     title: videoData.title,
//     author: videoData.author,
//     canBeDownloaded: true,
//     minAgeRestriction: null,
//     createdAt: new Date().toISOString(),
//     publicationDate: new Date().toISOString(),
//     availableResolutions: videoData.availableResolutions,
//   }
// }

const updateVideoValidator = (IdVide: number, videoData: InputForUpdateVideoType): ErrorType => {
  const error: ErrorType = {
    errorsMessages: []
  }

  if (!videoData.title) {
    error.errorsMessages.push({ field: 'title', message: 'video title missing' })
  } else {
    if (typeof videoData.title !== 'string') {
      error.errorsMessages.push({ field: 'title', message: 'video title should be string' })
    }
  }

  if (!videoData.author) {
    error.errorsMessages.push({ field: 'author', message: 'video author missing' })
  } else {
    if (typeof videoData.author !== 'string') {
      error.errorsMessages.push(
        { field: 'author', message: 'video author should be string' }
      )
    }
  }

  if (!IdVide) {
    error.errorsMessages.push({ field: 'id', message: 'video id not specified' })

  }

  return error
}