import { dbLocal } from "../../db/db"
import { BlogType, CreateUpdateBlogType } from "../../types/blogsType"

type IdBlogsType = string | null | undefined

export const blogsRepository = {
  getBlogs() {
    return dbLocal.blogs
  },
  findBlogById(id: IdBlogsType): BlogType | undefined {
    if (id) {
      const findBlogById = dbLocal.blogs.find((blog) => blog.id === id)
      return findBlogById
    } else {
      return undefined
    }
  },
  createBlog(blogData: CreateUpdateBlogType): BlogType {
    const newBlog = {
      id: (Date.now() + Math.random()) + '',
      name: blogData.name,
      description: blogData.description,
      websiteUrl: blogData.websiteUrl
    }

    dbLocal.blogs.push(newBlog)
    return newBlog
  },
  deleteBlog(id: IdBlogsType): boolean {
    for (let index = 0; index < dbLocal.blogs.length; index++) {
      if (dbLocal.blogs[index].id === id) {
        dbLocal.blogs.splice(index, 1);
        return true
      }
    }
    return false
  },
  updateBlog(id: IdBlogsType, inputBlog: CreateUpdateBlogType): boolean {
    for (let index = 0; index < dbLocal.blogs.length; index++) {
      const blog = dbLocal.blogs[index];
      if (blog.id === id) {
        dbLocal.blogs.splice(index, 1, {
          ...blog,
          ...inputBlog,
          id
        })
        return true
      }
    }
    return false
  }
}