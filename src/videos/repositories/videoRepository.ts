import moment from "moment"
import { dbLocal } from "../../db/db"
import { InputForCreateVideoType, InputForUpdateVideoType, OutputVideoType } from "../../types/videosTypes"

type IdVideoType = number | null | undefined

export const videoRepository = {
  getVideos() {},
  findVideoById(id: IdVideoType): OutputVideoType | undefined {
    if (id) {
      const findVideoById = dbLocal.videos.find((video) => video.id === id)
      return findVideoById
    } else {
      return undefined
    }
  },
  createVideos(videoData: InputForCreateVideoType): OutputVideoType {
    const newVideo =  {
      id: Math.trunc(Date.now() + Math.random()),
      title: videoData.title,
      author: videoData.author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: moment(new Date()).add(1, 'day').toISOString(),
      availableResolutions: videoData.availableResolutions,
    }

    dbLocal.videos.push(newVideo)
    return newVideo
  },
  deleteVideo(id: IdVideoType): boolean {
    for (let index = 0; index < dbLocal.videos.length; index++) {
      if (dbLocal.videos[index].id === id) {
        dbLocal.videos.splice(index, 1);
        return true
      }
    }
    return false
  },
  updateVideo(id: IdVideoType, inputVideo: InputForUpdateVideoType): boolean {
    for (let index = 0; index < dbLocal.videos.length; index++) {
      const video = dbLocal.videos[index];
      if (video.id === id) {
        dbLocal.videos.splice(index, 1, {
          ...video,
          ...inputVideo,
          id
        })
        return true
      }
    }
    return false
  }
}