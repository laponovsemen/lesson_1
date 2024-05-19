import { app } from './app'
import { SETTINGS } from './settings'
import { runDB } from './db/db'

export const startApp = async () => {
    if(!await runDB()) process.exit(1)
    app.listen(SETTINGS.PORT, async() => {
        // ВСЕ Только title 
        // console.log((await postCollection.find({},{projection: {title:1, _id:0}}).toArray()) as {title:string}[])
        // Только title применять для фильтра
        // console.log((await postCollection.find({title: /*'Other'*/ new RegExp('Ot','i')},{projection: {title:1, _id:0}}).toArray()) as {title:string}[])
        // Кол-во документов
        // console.log((await postCollection.countDocuments({title: /*'Other'*/ new RegExp('Ot','i')})))
        
        console.log(`...server started on port ${SETTINGS.PORT}`)
    })
}

startApp()