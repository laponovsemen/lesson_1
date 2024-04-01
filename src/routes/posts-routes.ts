import { Router } from "express"
import { getPostsController } from "../posts/controllers/getPostsController"
import { getPostController } from "../posts/controllers/getPostController"
import { createPostController } from "../posts/controllers/createPostController"

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.get('/:id', getPostController)
postsRouter.post('/', createPostController)
// videosRouter.delete('/:id', deleteVideoController)
// videosRouter.put('/:id', updateVideoController)