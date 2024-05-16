import { ObjectId } from "mongodb"
import { dbLocal, postCollection } from "../../db/db"
import { CreateUpdatePostType, PostDBType, PostType } from "../../types/postsTypes"

type IdPostType = string | null | undefined

export const postRepository = {
  getPosts() {
    return dbLocal.posts
  },

  async findPost(idPost: ObjectId): Promise<PostDBType | null> {
    return await postCollection.findOne({_id: idPost})
  },

  async findForOutput(idPost: ObjectId): Promise<PostType | null> {
    const post = await postCollection.findOne({_id: idPost})
    
    return post ? this.mapToOutput(post) as PostType : null
  },

  mapToOutput (post: PostDBType): any {
    return {
      id: post._id,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName
    }
  },

  // findPostById(id: IdPostType): PostType | undefined {
  //   if (id) {
  //     const findPostById = dbLocal.posts.find((post) => post.id === id)
  //     return findPostById
  //   } else {
  //     return undefined
  //   }
  // },
  // postData: CreateUpdatePostType
  async createPost(postData: any): Promise<{error?: string, id?: ObjectId}> {
    const newPost = { ...postData }
    console.log('created newPost', newPost);
    
    try {
      const insertedInfo = await postCollection.insertOne(newPost)
      console.log('created insertedInfo', insertedInfo);
      
      return {id: new ObjectId(insertedInfo.insertedId)}
    } catch (error) {
      console.log(error)
      return {error: 'error'}
    }
    //   id: (Date.now() + Math.random()) + '',
    //   title: postData.title,
    //   shortDescription: postData.shortDescription,
    //   content: postData.content,
    //   blogId: postData.blogId,
    //   blogName: 'string'
    // }

    // dbLocal.posts.push(newPost)
    // return newPost

  },
  deletePost(id: IdPostType): boolean {
    for (let index = 0; index < dbLocal.posts.length; index++) {
      if (dbLocal.posts[index].id === id) {
        dbLocal.posts.splice(index, 1);
        return true
      }
    }
    return false
  },
  updatePost(id: IdPostType, inputPost: CreateUpdatePostType): boolean {
    for (let index = 0; index < dbLocal.posts.length; index++) {
      const post = dbLocal.posts[index];
      if (post.id === id) {
        dbLocal.posts.splice(index, 1, {
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