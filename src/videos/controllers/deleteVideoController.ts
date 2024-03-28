import { Request, Response } from 'express'
import { db, setDB } from '../../db/db'
import { OutputVideoType } from '../types/videos-types'

type ParamsType = {
  id: string
}

type ReqQueryType = string

export const deleteVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  let isNotFound = true
  if (req.params.id) {
    const filteredVideos = db.videos.filter((video) => {
     if(video.id === +req.params.id){
      isNotFound =false
     }
      return video.id !== +req.params.id
    })
  
    
    if (isNotFound) {
      res
      .sendStatus(404)
    } else {
      setDB({videos: filteredVideos})
        res
      .sendStatus(204)
    }
  } else {
    res
      .sendStatus(400)
  }
}
