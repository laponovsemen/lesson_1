import { Router } from "express"
import { getVideosController } from "../videos/controllers/getVideosController"
import { getVideoController } from "../videos/controllers/getVideoController"
import { createVideoController } from "../videos/controllers/createVideoController"
import { deleteVideoController } from "../videos/controllers/deleteVideoController"
import { updateVideoController } from "../videos/controllers/updateVideoController"

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.get('/:id', getVideoController)
videosRouter.post('/', createVideoController)
videosRouter.delete('/:id', deleteVideoController)
videosRouter.put('/:id', updateVideoController)