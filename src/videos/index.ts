import { Router } from "express";
import { getVideosController } from "./controllers";
import { findVideoController } from "./controllers/findVideoController copy";
import { createVideoController } from "./controllers/createVideoController";
import { deleteVideoController } from "./controllers/deleteVideoController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.get('/:id', findVideoController)
videosRouter.post('/', createVideoController)
videosRouter.delete('/:id', deleteVideoController)
