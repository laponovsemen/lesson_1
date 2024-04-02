import { Router } from "express"
import { getPostsController } from "../posts/controllers/getPostsController"
import { getPostController } from "../posts/controllers/getPostController"
import { createPostController } from "../posts/controllers/createPostController"
import { updatePostController } from "../posts/controllers/updatePostController"
import { lengthValid } from "../middlewares/posts-validator"
import { errorsValidation } from "../middlewares/errors-validation"
import { check } from "express-validator"

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.get('/:id', getPostController)
postsRouter.post(
  '/',
  check(['title', 'shortDescription', 'content', 'blogId']),
  lengthValid({title: 'title', max: 30}),
  lengthValid({title: 'shortDescription', max: 100}),
  lengthValid({title: 'content', max: 1000}),
  errorsValidation,
  createPostController)
// videosRouter.delete('/:id', deleteVideoController)
postsRouter.put(
  '/:id',
  check(['title', 'shortDescription', 'content', 'blogId']),
  lengthValid({title: 'title', max: 30}),
  lengthValid({title: 'shortDescription', max: 100}),
  lengthValid({title: 'content', max: 1000}),
  errorsValidation,
  updatePostController
  )