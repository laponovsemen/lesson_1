import { OutputVideoType } from "../videos/types/videos-types"

export type DBType = {
  videos: OutputVideoType[]
  // some: any[]
}

export const db: DBType = {
  videos: [],
  // some: []
}

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    db.videos = []
    // db.some = []
  } else {
    db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
  }
}