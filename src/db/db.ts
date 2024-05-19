import { BlogType } from "../types/blogsType"
import { PostType } from "../types/postsTypes"
import { OutputVideoType } from "../types/videosTypes"
import { Collection, Db, MongoClient } from "mongodb"
import * as dotenv from 'dotenv'
import { BlogDBType } from "../types/db-types/blogsDBTypes"
import { PostDBType } from "../types/db-types/postsDBTypes"


export type DBType = {
  videos: OutputVideoType[]
  posts: PostType[]
  blogs: BlogType[]
}


export const loginPassword = 'admin:qwerty'
export const dbLocal: DBType = {
  videos: [],
  posts: [],
  blogs: []
}

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    dbLocal.videos = []
    dbLocal.posts = []
    dbLocal.blogs = []
  } else {
    dbLocal.videos = dataset.videos || dbLocal.videos
    dbLocal.posts = dataset.posts || dbLocal.posts
    dbLocal.blogs = dataset.blogs || dbLocal.blogs
  }
}
////!
dotenv.config()

const mongoURL = process.env.MONGO_URL
const postCollectionName = process.env.POST_COLLECTION_NAME || 'mongodb://0.0.0.0:27017'
const blogCollectionName = process.env.BLOG_COLLECTION_NAME || 'mongodb://0.0.0.0:27017'
let client: MongoClient = {} as MongoClient
export let db: Db = {} as Db

export let postCollection: Collection<PostDBType> = {} as Collection<PostDBType>
export let blogCollection: Collection<BlogDBType> = {} as Collection<BlogDBType>

export const runDB = async () => {
  if (!mongoURL) {
    return new Error("! Url doesn't found")
  }
  try {
    client = new MongoClient(mongoURL)
    db = client.db(process.env.DB_NAME)
    
    postCollection = db.collection<PostDBType>(postCollectionName)
    blogCollection = db.collection<BlogDBType>(blogCollectionName)

    await client.connect()
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
    return true
  } catch (e) {
    // Ensures that the client will close when you finish/error
    console.log(e)
    await client.close()
    return false
  }
}