import {DBType} from '../src/db/db'
import { ResolutionsEnum } from '../src/videos/enums/videos-enum'
import { OutputVideoType } from '../src/videos/types/videos-types'

export const video1: OutputVideoType= {
  id: Date.now() + Math.random(),
  title: 't' + Date.now() + Math.random(),
  author: 'a' + Date.now() + Math.random(),
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: new Date().toISOString(),
  publicationDate: new Date().toISOString(),
  availableResolutions: [ResolutionsEnum.P1440],
}

export const dataset1: DBType = {
  videos: [video1],
}

export const dataset2 = (setId: number): DBType => {
  const videosData = [video1, {
    id: setId,
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [ResolutionsEnum.P240],
  }]

  return {
    videos: videosData,
  }
}