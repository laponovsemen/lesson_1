import { Router } from "express"
import { getPostsController } from "../posts/controllers/getPostsController"
import { getPostController } from "../posts/controllers/getPostController"

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.get('/:id', getPostController)
// videosRouter.post('/', createVideoController)
// videosRouter.delete('/:id', deleteVideoController)
// videosRouter.put('/:id', updateVideoController)