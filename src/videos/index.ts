import { Router } from "express";
import { findVideoController } from "./controllers/findVideoController copy";
import { createVideoController } from "./controllers/createVideoController";
import { deleteVideoController } from "./controllers/deleteVideoController";
import { getVideosController } from "./controllers/getVideosController";
import { updateVideoController } from "./controllers/updateVideoController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.get('/:id', findVideoController)
videosRouter.post('/', createVideoController)
videosRouter.delete('/:id', deleteVideoController)
videosRouter.put('/:id', updateVideoController)
