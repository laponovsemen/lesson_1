import { Request, Response } from 'express'
import { db, setDB } from '../../db/db'
import { OutputVideoType } from '../types/videos-types'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const deleteVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  console.log('ky');
  
  if (req.params.id) {
    const filteredVideos = db.videos.filter((video) => video.id !== +req.params.id)
  
    setDB({videos: filteredVideos})
  
    res
      .sendStatus(204)
  } else {
    res
      .sendStatus(404)
  }
}
