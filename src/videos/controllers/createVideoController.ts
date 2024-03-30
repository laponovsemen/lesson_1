import { Request, Response } from 'express'
import { ErrorType } from '../../types/errorType';
import { InputForCreateVideoType, OutputVideoType } from '../types/videos-types';
import { videoValidator } from '../../validators/validators';
import { TypeRequestEnum } from '../enums/videos-enum';
import { videoRepository } from '../repositories/videoRepository';

type ResBodyType = OutputVideoType | ErrorType

export const createVideoController = (req: Request<any, any, InputForCreateVideoType>, res: Response<ResBodyType>) => {
  const inputVideo = req.body;
  const error = videoValidator(TypeRequestEnum.createVideo, inputVideo)

  if (error.errorsMessages.length === 0) {
    const newVideo = videoRepository.createVideos(inputVideo)
    res
      .status(201)
      .json(newVideo)
  } else {
    res
      .status(400)
      .json(error)
  }
}
