import { ErrorsMessageType, ErrorType } from "../types/errorType"
import { ResolutionsEnum, TypeRequestEnum } from "../videos/enums/videos-enum";
import { InputForCreateVideoType, InputForUpdateVideoType } from "../videos/types/videos-types";

export const videoValidator = (typeRequest: TypeRequestEnum, videoData: any): ErrorType => {
  const error: ErrorType = {
    errorsMessages: []
  }

  if (!videoData.title) {
    if( typeRequest === TypeRequestEnum.createVideo || typeRequest === TypeRequestEnum.updateVideo ) { // this request requires a required field
      error.errorsMessages.push({ field: 'title', message: 'video title missing' })
    }
  } else {
    if (typeof videoData.title !== 'string') {
      error.errorsMessages.push({ field: 'title', message: 'video title should be string' })
    } else if (videoData.title.length > 40) {
      error.errorsMessages.push({ field: 'title', message: 'video title max length = 40' })
    }
  }

  if (!videoData.author) {
    if( typeRequest === TypeRequestEnum.createVideo || typeRequest === TypeRequestEnum.updateVideo ) { // this request requires a required field
      error.errorsMessages.push({ field: 'author', message: 'video author missing' })
    }
  } else {
    if (typeof videoData.author !== 'string') {
      error.errorsMessages.push(
        { field: 'author', message: 'video author should be string' }
      )
    } else if (videoData.title.length > 20) {
      error.errorsMessages.push({ field: 'author', message: 'video author max length = 20' })
    }
  }
  
  if (!videoData.availableResolutions) {
    if( typeRequest === TypeRequestEnum.createVideo || typeRequest === TypeRequestEnum.updateVideo ) { // this request requires a required field
      error.errorsMessages.push({ field: 'availableResolutions', message: 'video availableResolutions missing' })
    }
  } else {
    if (videoData.availableResolutions.length < 1) {
      error.errorsMessages.push({field: 'availableResolutions', message: "video availableResolutions don't empty"})
    } else if (videoData.availableResolutions.length > 0) {
      const incorrectValues = availableResolutionsValid(videoData.availableResolutions)
      
      if(incorrectValues.length > 0) {
        error.errorsMessages.push({field: 'availableResolutions', message: `incorrect values ${incorrectValues.join(', ')}`})
      }
    }

  if (!videoData.minAgeRestriction && typeRequest === TypeRequestEnum.updateVideo) {
    error.errorsMessages.push({ field: 'minAgeRestriction', message: 'video minAgeRestriction missing' })
  }
  if (!videoData.canBeDownloaded && typeRequest === TypeRequestEnum.updateVideo) {
    error.errorsMessages.push({ field: 'canBeDownloaded', message: 'video canBeDownloaded missing' })
  }
  if (!videoData.publicationDate && typeRequest === TypeRequestEnum.updateVideo) {
    error.errorsMessages.push({ field: 'publicationDate', message: 'video publicationDate missing' })
  }
  }

  return error
}

const availableResolutionsValid = (resolutions: ResolutionsEnum[]): string[] => {
  const strictValues = Object.values(ResolutionsEnum)
  const FindedErrorValues = resolutions.filter((resolution) => !strictValues.includes(resolution))
  return FindedErrorValues
}