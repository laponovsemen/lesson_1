import { Request, Response } from 'express'
import { db, setDB } from '../../db/db'
import { OutputVideoType } from '../../db/video-db-type'

type ParamsType = {
  id: string // 
}

type ReqQueryType = string //? строка ?

export const deleteVideoController = (req: Request<ParamsType, any, ReqQueryType>, res: Response<OutputVideoType>) => {
  if (req.params.id) {
    const filteredVideos = db.videos.filter((video) => video.id === +req.params.id)
  
    setDB({videos: filteredVideos})
  
    res
      .status(200)

  } else {
    res
      .status(400)
  }
}
