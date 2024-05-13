import { app } from './app'
import { SETTINGS } from './settings'
import { runDB } from './db/db'

export const startApp = async () => {
    await runDB()
    app.listen(SETTINGS.PORT, () => {
        console.log(`...server started on port ${SETTINGS.PORT}`)
    })
}

startApp()