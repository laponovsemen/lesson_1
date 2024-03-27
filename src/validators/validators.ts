import { ErrorsMessageType, ErrorType } from "../types/errorType"
import { ResolutionsEnum, TypeRequestEnum } from "../videos/enums/videos-enum";
import { InputForCreateVideoType, InputForUpdateVideoType } from "../videos/types/videos-types";
// ? type
export const videoValidator = (typeRequest: TypeRequestEnum, videoData: InputForUpdateVideoType): ErrorType => {
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
    }
  }
  
  if (!videoData.availableResolutions) {
    if( typeRequest === TypeRequestEnum.createVideo ) { // this request requires a required field
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

  if (!videoData.minAgeRestriction) {
  }
  }

  return error
}

const availableResolutionsValid = (resolutions: ResolutionsEnum[]): string[] => {
  const strictValues = Object.values(ResolutionsEnum)
  const FindedErrorValues = resolutions.filter((resolution) => !strictValues.includes(resolution))
  return FindedErrorValues
}