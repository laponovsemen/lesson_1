import { Router } from "express";
import { getVideoController } from "./controllers/getVideoController";
import { createVideoController } from "./controllers/createVideoController";
import { deleteVideoController } from "./controllers/deleteVideoController";
import { getVideosController } from "./controllers/getVideosController";
import { updateVideoController } from "./controllers/updateVideoController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.get('/:id', getVideoController)
videosRouter.post('/', createVideoController)
videosRouter.delete('/:id', deleteVideoController)
videosRouter.put('/:id', updateVideoController)
