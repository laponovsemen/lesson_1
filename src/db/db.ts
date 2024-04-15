import { BlogType } from "../types/blogsType"
import { PostType } from "../types/postsTypes"
import { OutputVideoType } from "../types/videosTypes"

export type DBType = {
  videos: OutputVideoType[]
  posts: PostType[]
  blogs: BlogType[]
}

export const loginPassword = 'admin:qwerty'
export const db: DBType = {
  videos: [],
  posts: [],
  blogs: []
}

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    db.videos = []
    db.posts = []
    db.blogs = []
  } else {
    db.videos = dataset.videos || db.videos
    db.posts = dataset.posts || db.posts
    db.blogs = dataset.blogs || db.blogs
  }
}