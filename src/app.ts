import express, { Request, Response } from 'express'
import { db } from './db/db'
import { SETTINGS } from './settings'
import { videosRouter } from './videos'
// import { createDB } from './db'
 
export const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello back-end HomeWorks in it-incubator!!!')
})
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
