import moment from 'moment';
import {DBType} from '../src/db/db'
import { ResolutionsEnum } from '../src/videos/enums/videos-enum'
import { PostType } from '../src/types/posts-types';
import { OutputVideoType } from '../src/types/videos-types';

export const video1= (id?: number, title?: string, canBeDownloaded?: any, minAgeRestriction?: number, publicationDate?: any): OutputVideoType => ({
  id: id ?? (Date.now() + Math.random()),
  title: title ?? ('t' + Date.now() + Math.random()),
  author: 'string',
  canBeDownloaded: canBeDownloaded ?? false,
  minAgeRestriction: minAgeRestriction ?? null,
  createdAt: new Date().toISOString(),
  publicationDate: publicationDate ?? new Date().toISOString(),
  availableResolutions: [ResolutionsEnum.P1440],
})

export const createPost= (): PostType => ({
  id: (Date.now() + Math.random())+'',
  title: ('t' + Date.now() + Math.random()),
  shortDescription:	'string',
  content:	'string',
  blogId:	'string',
  blogName:	'string'
})

export const dataset1: DBType = {
  videos: [video1()],
  posts: [createPost()],
}

export const dataVideoSet2 = (setId: number, title?: string, minAgeRestriction?: number): DBType => {
  const videosData = [video1(), {
    id: setId,
    title: title ?? ('t' + Date.now() + Math.random()),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: minAgeRestriction ?? null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date(),
    availableResolutions: [ResolutionsEnum.P240],
  }]

  return {
    videos: videosData,
    posts: []
  }
}