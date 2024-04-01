import moment from "moment"
import { db } from "../../db/db"
import { PostType } from "../../videos/types/posts-types"

type IdPostType = string | null | undefined

export const postRepository = {
  getVideos() {},
  findPostById(id: IdPostType): PostType | undefined {
    console.log('findPostById', id)
    if (id) {
      const findPostById = db.posts.find((post) => post.id === id)
      console.log('findPostById', findPostById)
      return findPostById
    } else {
      return undefined
    }
  },
//   createVideos(videoData: InputForCreateVideoType): OutputVideoType {
//     const newVideo =  {
//       id: Math.trunc(Date.now() + Math.random()),
//       title: videoData.title,
//       author: videoData.author,
//       canBeDownloaded: false,
//       minAgeRestriction: null,
//       createdAt: new Date().toISOString(),
//       publicationDate: moment(new Date()).add(1, 'day').toISOString(),
//       availableResolutions: videoData.availableResolutions,
//     }

//     db.videos.push(newVideo)
//     return newVideo
//   },
//   deleteVideo(id: IdVideoType): boolean {
//     for (let index = 0; index < db.videos.length; index++) {
//       if (db.videos[index].id === id) {
//         db.videos.splice(index, 1);
//         return true
//       }
//     }
//     return false
//   },
//   updateVideo(id: IdVideoType, inputVideo: InputForUpdateVideoType): boolean {
//     for (let index = 0; index < db.videos.length; index++) {
//       const video = db.videos[index];
//       if (video.id === id) {
//         db.videos.splice(index, 1, {
//           ...video,
//           ...inputVideo,
//           id
//         })
//         return true
//       }
//     }
//     return false
//   }
}