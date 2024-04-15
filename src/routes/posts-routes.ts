import { Router } from "express"
import { getPostsController } from "../posts/controllers/getPostsController"
import { getPostController } from "../posts/controllers/getPostController"
import { createPostController } from "../posts/controllers/createPostController"
import { updatePostController } from "../posts/controllers/updatePostController"
import { deletePostController } from "../posts/controllers/deletePostController"
import { lengthValid } from "../middlewares/validators"
import { errorsValidation } from "../middlewares/errors-validation"
import { check } from "express-validator"
import { authMiddleware } from "../middlewares/authValidation"

export const postsRouter = Router()

postsRouter.get('/', getPostsController)
postsRouter.get('/:id', getPostController)
postsRouter.post(
  '/',
  authMiddleware,
  check(['title', 'shortDescription', 'content', 'blogId']),
  lengthValid({ title: 'title', max: 30 }),
  lengthValid({ title: 'shortDescription', max: 100 }),
  lengthValid({ title: 'content', max: 1000 }),
  errorsValidation,
  createPostController)
postsRouter.delete('/:id',
  authMiddleware,
  deletePostController)
postsRouter.put(
  '/:id',
  authMiddleware,
  check(['title', 'shortDescription', 'content', 'blogId']),
  lengthValid({ title: 'title', max: 30 }),
  lengthValid({ title: 'shortDescription', max: 100 }),
  lengthValid({ title: 'content', max: 1000 }),
  errorsValidation,
  updatePostController
)