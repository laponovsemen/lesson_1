import moment from 'moment';
import { ErrorsMessageType, ErrorType } from "../types/errorType"
import { ResolutionsEnum, TypeRequestEnum } from "../videos/enums/videos-enum";
import { InputForCreateVideoType, InputForUpdateVideoType } from "../videos/types/videos-types";

export const videoValidator = (typeRequest: TypeRequestEnum, videoData: any): ErrorType => {
  const error: ErrorType = {
    errorsMessages: []
  }

  if (!videoData.title) {
    error.errorsMessages.push({ field: 'title', message: 'video title missing' })
  } else {
    if (typeof videoData.title !== 'string') {
      error.errorsMessages.push({ field: 'title', message: 'video title should be string' })
    } else if (videoData.title.length > 40) {
      error.errorsMessages.push({ field: 'title', message: 'video title max length = 40' })
    }
  }

  if (!videoData.author) {
    error.errorsMessages.push({ field: 'author', message: 'video author missing' })
  } else {
    if (typeof videoData.author !== 'string') {
      error.errorsMessages.push(
        { field: 'author', message: 'video author should be string' }
      )
    } else if (videoData.author.length > 20) {
      error.errorsMessages.push({ field: 'author', message: 'video author max length = 20' })
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
  if (typeRequest === TypeRequestEnum.updateVideo) {
    if (videoData.minAgeRestriction === null) {
      error.errorsMessages.push({ field: 'minAgeRestriction', message: 'video minAgeRestriction missing' })
    } else {
      if( videoData.minAgeRestriction > 18) {
        error.errorsMessages.push({ field: 'minAgeRestriction', message: 'video minAgeRestriction max 18' })
      } else if (videoData.minAgeRestriction < 1)
        error.errorsMessages.push({ field: 'minAgeRestriction', message: 'video minAgeRestriction min 1' })
    }
  
    if ((videoData.canBeDownloaded === null || typeof videoData.canBeDownloaded === 'number')) {
      error.errorsMessages.push({ field: 'canBeDownloaded', message: 'video canBeDownloaded missing' })
    } else {
      if(typeof videoData.canBeDownloaded !== 'boolean') {
        error.errorsMessages.push({ field: 'canBeDownloaded', message: 'video canBeDownloaded type shoul be boolean' })
  
      }
    }
    
    if (!videoData.publicationDate) {
      error.errorsMessages.push({ field: 'publicationDate', message: 'video publicationDate missing' })
    } else {
      if(typeof videoData.publicationDate !== 'string' || isNaN(Date.parse(videoData.publicationDate))) {
        error.errorsMessages.push({ field: 'publicationDate', message: 'video publicationDate is not date' })
      }
    }
  }

  return error
}

const availableResolutionsValid = (resolutions: ResolutionsEnum[]): string[] => {
  const strictValues = Object.values(ResolutionsEnum)
  const FindedErrorValues = resolutions.filter((resolution) => !strictValues.includes(resolution))
  return FindedErrorValues
}
