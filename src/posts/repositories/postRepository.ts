import { db } from "../../db/db"
import { CreatePostType, PostType } from "../../types/posts-types"

type IdPostType = string | null | undefined

export const postRepository = {
  getVideos() {},
  findPostById(id: IdPostType): PostType | undefined {
    if (id) {
      const findPostById = db.posts.find((post) => post.id === id)
      return findPostById
    } else {
      return undefined
    }
  },
  createPost(postData: CreatePostType): PostType {
    const newPost =  {
      id: (Date.now() + Math.random())+'',
      title: postData.title,
      shortDescription:	postData.shortDescription,
      content:	postData.content,
      blogId:	postData.blogId,
      blogName:	'string'
    }

    db.posts.push(newPost)
    return newPost
  },
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