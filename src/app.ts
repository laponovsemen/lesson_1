import express, { Request, Response } from 'express'
import { setDB, runDB } from './db/db'
import { SETTINGS } from './settings'
import { postsRouter } from './routes/posts-routes'
import { videosRouter } from './routes/videos-routes'
import { blogsRouter } from './routes/blogs-routers'

export const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello back-end HomeWorks in it-incubator!!!')
})
app.delete('/testing/all-data', (req: Request, res: Response) => {
    setDB();
    res.sendStatus(204)
})
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
// mongodb+srv://iq23life:<password>@cluster0.bpveovv.mongodb.net/