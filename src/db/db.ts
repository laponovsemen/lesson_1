import { PostType } from "../videos/types/posts-types"
import { OutputVideoType } from "../videos/types/videos-types"

export type DBType = {
  videos: OutputVideoType[]
  posts: PostType[]
}

export const db: DBType = {
  videos: [],
  posts: [],
  // blogs: []
}

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    db.videos = []
    db.posts = []
  } else {
    db.videos = dataset.videos || db.videos
    db.posts = dataset.posts || db.posts
  }
}