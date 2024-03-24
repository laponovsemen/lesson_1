import { Request, Response } from 'express'
import { db } from '../../db/db'
import { InputVideoType, OutputVideoType, ResolutionsEnum } from '../../db/video-db-type';
import { ErrorType } from '../../types/errorType';

type ResBodyType = OutputVideoType | ErrorType

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<ResBodyType>) => {
  const inputVideo = req.body;
  const isRequerFields = inputVideo.title
    && inputVideo.availableResolutions.length > 0
    && inputVideo.author

  if (isRequerFields) {
    const newVideo = createNewVideo(inputVideo)
    db.videos.push(newVideo)
    res
      .status(201)
      .json(newVideo)
  } else {
    res
      .status(400)
      .json(createVideoValidator(inputVideo))
  }
}

const createNewVideo = (videoData: InputVideoType): OutputVideoType => {
  return {
    id: Date.now() + Math.random(),
    title: videoData.title,
    author: videoData.author,
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: videoData.availableResolutions,
  }
}

export const createVideoValidator = (videoData: InputVideoType): ErrorType => {
  const error: ErrorType = {
    errorsMessages: []
  }

  const availableResolutionsValid = (resolutions: ResolutionsEnum[]): string[] => {
    const strictValues = Object.values(ResolutionsEnum)
    const FindedErrorValues = resolutions.filter((resolution) => !strictValues.includes(resolution))
    return FindedErrorValues
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

  if (!videoData.availableResolutions) {
    error.errorsMessages.push({ field: 'availableResolutions', message: 'video availableResolutions missing' })
  } else {
    if (videoData.availableResolutions.length < 1) {
      error.errorsMessages.push({field: 'availableResolutions', message: "video availableResolutions don't empty"})
    } else if (videoData.availableResolutions.length > 0) {
      const incorrectValues = availableResolutionsValid(videoData.availableResolutions)

      if(incorrectValues.length > 0) {
        error.errorsMessages.push({field: 'availableResolutions', message: `incorrect values ${incorrectValues.join(', ')}`})
      }
    }
  }

  return error
}