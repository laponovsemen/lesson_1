import { ResolutionsEnum } from "../videos/enums/videos-enum"

export type OutputVideoType = {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRestriction: number | null
  createdAt: string
  publicationDate: Date | string
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
  createdAt?: string
  publicationDate?: string
  availableResolutions?: ResolutionsEnum[]
}