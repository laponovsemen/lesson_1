import { Router } from "express";
import { getVideosController } from "./videosControllers";

export type ParamType = {
  id: string
}

export type BodyType = {
  id: number
  title: string
  // ...
}

export type QueryType = {
  search?: string
}

// export const someController = (req: Request<ParamType, any, BodyType, QueryType>, res: Response<void | OutputErrorsType>) => {

// }

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
// videosRouter.post('/', createVideoController)
// videosRouter.get('/:id', findVideoController)
// videosRouter.delete('/:id', deleteVideoController)


// ... validation ... //
// import {OutputErrorsType} from '../input-output-types/output-errors-type'
 
// const inputValidation = (video: InputVideoType) => {
//     const errors: OutputErrorsType = {
//         errorsMessages: []
//     }
// // ...
//     if (!Array.isArray(video.availableResolution)
//     || video.availableResolution.find(p => !Resolutions[p])
//     ) {
//         errors.errorsMessages.push({
//             message: 'error!!!!', field: 'availableResolution'
//         })
//     }
//     return errors
// }
 
// export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<OutputVideoType | OutputErrorsType>) => {
//     const errors = inputValidation(req.body)
//     if (errors.errorsMessages.length) {
//         res
//             .status(400)
//             .json(errors)
//         return
//     }
 
//     const newVideo: VideoDBType = {
//         ...req.body,
//         id: Date.now() + Math.random(),
//         // ...
//     }
//     db.videos = [...db.videos, newVideo]
 
//     res
//         .status(201)
//         .json(newVideo)
// }