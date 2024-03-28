import { Request, Response } from 'express'
import moment from 'moment';
import { db } from '../../db/db'
import { ErrorType } from '../../types/errorType';
import { InputForCreateVideoType, OutputVideoType } from '../types/videos-types';
import { videoValidator } from '../../validators/validators';
import { TypeRequestEnum } from '../enums/videos-enum';

type ResBodyType = OutputVideoType | ErrorType

export const createVideoController = (req: Request<any, any, InputForCreateVideoType>, res: Response<ResBodyType>) => {
  const inputVideo = req.body;
  const error = videoValidator(TypeRequestEnum.createVideo, inputVideo)

  if (!error.errorsMessages.length) {
    const newVideo = createNewVideo(inputVideo)
    db.videos.push(newVideo)
    res
      .status(201)
      .json(newVideo)
  } else {
    res
      .status(400)
      .json(error)
  }
}

const createNewVideo = (videoData: InputForCreateVideoType): OutputVideoType => {
  return {
    id: Math.trunc(Date.now() + Math.random()),
    title: videoData.title,
    author: videoData.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: moment(new Date()).add(1, 'day').toISOString(),
    availableResolutions: videoData.availableResolutions,
  }
}

// export const createVideoValidator = (videoData: InputForCreateVideoType): ErrorType => {
  // const error: ErrorType = {
  //   errorsMessages: []
  // }



  // videoTitleValid(videoData.title)

  // if (!videoData.title) {
  //   error.errorsMessages.push({ field: 'title', message: 'video title missing' })
  // } else {
  //   if (typeof videoData.title !== 'string') {
  //     error.errorsMessages.push({ field: 'title', message: 'video title should be string' })
  //   }
  // }

  // if (!videoData.author) {
  //   error.errorsMessages.push({ field: 'author', message: 'video author missing' })
  // } else {
  //   if (typeof videoData.author !== 'string') {
  //     error.errorsMessages.push(
  //       { field: 'author', message: 'video author should be string' }
  //     )
  //   }
  // }

  // if (!videoData.availableResolutions) {
  //   error.errorsMessages.push({ field: 'availableResolutions', message: 'video availableResolutions missing' })
  // } else {
  //   if (videoData.availableResolutions.length < 1) {
  //     error.errorsMessages.push({field: 'availableResolutions', message: "video availableResolutions don't empty"})
  //   } else if (videoData.availableResolutions.length > 0) {
  //     const incorrectValues = availableResolutionsValid(videoData.availableResolutions)

  //     if(incorrectValues.length > 0) {
  //       error.errorsMessages.push({field: 'availableResolutions', message: `incorrect values ${incorrectValues.join(', ')}`})
  //     }
  //   }
  // }

//   return error
// }