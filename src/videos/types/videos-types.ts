import { ResolutionsEnum } from "../enums/videos-enum"

export type OutputVideoType = {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRestriction: number | null
  createdAt: string // ? Date 
  publicationDate: Date | string // ? Date
  availableResolutions: ResolutionsEnum[]
}

  export type InputForCreateVideoType = {
  title: string
  author: string
  availableResolutions: ResolutionsEnum[]
}

  export type InputForUpdateVideoType = {
  title: string
  author: string
  id: number
  canBeDownloaded?: boolean
  minAgeRestriction?: number | null
  createdAt?: string // ? Date 
  publicationDate?: string // ? Date
  availableResolutions?: ResolutionsEnum[]
}