import { Request, Response } from 'express'
import { db, setDB } from '../../db/db'
import { OutputVideoType } from '../types/videos-types';
import { videoValidator } from '../../validators/validators';
import { TypeRequestEnum } from '../enums/videos-enum';

type ParamsType = {
  id: string
}
type ResBodyType = OutputVideoType

export const updateVideoController = (req: Request<ParamsType, any, OutputVideoType>, res: Response<any>) => {

  const inputVideo = req.body;
  const isRequerFields = !!(inputVideo.availableResolutions && inputVideo.title && inputVideo.author && inputVideo.minAgeRestriction && inputVideo.publicationDate && inputVideo.canBeDownloaded)
  let isUpdateVideo = false

  if (isRequerFields && req.params.id) {
    const updatedVideos = db.videos.map((video) => {
      if (video.id === +req.params.id) {
        isUpdateVideo = true
        return inputVideo
      }
      return video
    })
    setDB({videos: updatedVideos})

    if (isUpdateVideo) {
      res
        .status(201)
        .json(inputVideo)
    } else {
      res
        .sendStatus(404)
    }
  } else {
    res
      .status(400)
      .json(videoValidator(TypeRequestEnum.updateVideo, inputVideo))
  }
}
