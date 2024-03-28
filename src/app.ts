import express, { Request, Response } from 'express'
import { setDB } from './db/db'
import { SETTINGS } from './settings'
import { videosRouter } from './videos'
 
export const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello back-end HomeWorks in it-incubator!!!')
})
app.delete('hometask_01/api/testing/all-data', (req: Request, res: Response) => {
    setDB();
    res.sendStatus(204)
})
app.use(SETTINGS.PATH.VIDEOS, videosRouter)
