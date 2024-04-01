import { Request, Response } from 'express'
import { InputForUpdateVideoType, OutputVideoType } from '../types/videos-types';
import { videoValidator } from '../../validators/validators';
import { TypeRequestEnum } from '../enums/post-enum';
import { ErrorType } from '../../types/errorType';
import { videoRepository } from '../repositories/postRepository';

type ParamsType = {
  id: string
}
type ResBodyType = OutputVideoType

export const updateVideoController = (req: Request<ParamsType, any, InputForUpdateVideoType>, res: Response<ResBodyType | ErrorType>) => {
  const inputVideo = req.body;
  const error = videoValidator(TypeRequestEnum.updateVideo, inputVideo)

  if (error.errorsMessages.length === 0 && req.params.id) {
    const isUpdateVideo = videoRepository.updateVideo(+req.params.id, inputVideo)

    if (isUpdateVideo) {
      res
        .sendStatus(204)
    } else {
      res
        .sendStatus(404)
    }
  } else {
    res
      .status(400)
      .json(error)
  }
}
