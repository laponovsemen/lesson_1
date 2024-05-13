import { BlogType } from "../types/blogsType"
import { PostType } from "../types/postsTypes"
import { OutputVideoType } from "../types/videosTypes"
import { MongoClient, ObjectId, ServerApiVersion  } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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

export const productCollection = client.db().collection<{title: string, _id?: ObjectId}>

export const runDB = async () => {
  try {
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}