import { db } from "../../db/db"
import { CreateUpdatePostType, PostType } from "../../types/posts-types"

type IdPostType = string | null | undefined

export const postRepository = {
  getPosts() {
    return db.posts
  },
  findPostById(id: IdPostType): PostType | undefined {
    if (id) {
      const findPostById = db.posts.find((post) => post.id === id)
      return findPostById
    } else {
      return undefined
    }
  },
  createPost(postData: CreateUpdatePostType): PostType {
    const newPost = {
      id: (Date.now() + Math.random()) + '',
      title: postData.title,
      shortDescription: postData.shortDescription,
      content: postData.content,
      blogId: postData.blogId,
      blogName: 'string'
    }

    db.posts.push(newPost)
    return newPost
  },
  deletePost(id: IdPostType): boolean {
    for (let index = 0; index < db.posts.length; index++) {
      if (db.posts[index].id === id) {
        db.posts.splice(index, 1);
        return true
      }
    }
    return false
  },
  updatePost(id: IdPostType, inputPost: CreateUpdatePostType): boolean {
    for (let index = 0; index < db.posts.length; index++) {
      const post = db.posts[index];
      if (post.id === id) {
        db.posts.splice(index, 1, {
          ...post,
          ...inputPost,
          id
        })
        return true
      }
    }
    return false
  }
}