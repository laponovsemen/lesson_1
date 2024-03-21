import {Request, Response} from 'express'
import {db} from '../db/db'

export const getVideosController = (req: Request, res: Response) => {
  res
    .status(200)
    .json(db.videos)
}
// export const createVideoController = (req: Request, res: Response) => {
//   res
//     .status(200)
//     .json(db.videos)
// }