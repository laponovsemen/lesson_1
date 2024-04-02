import { Router } from "express"
import { getPostsController } from "../posts/controllers/getPostsController"
import { getPostController } from "../posts/controllers/getPostController"
import { createPostController } from "../posts/controllers/createPostController"
import { lengthValid } from "../middlewares/posts-validator"
import { errorsValidation } from "../middlewares/errors-validation"

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.get('/:id', getPostController)
postsRouter.post(
  '/',
  lengthValid('title', 30),
  lengthValid('shortDescription', 100),
  lengthValid('content', 1000),
  errorsValidation,
  createPostController)
// videosRouter.delete('/:id', deleteVideoController)
// videosRouter.put('/:id', updateVideoController)