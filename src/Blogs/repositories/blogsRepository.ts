import { db } from "../../db/db"
import { BlogType, CreateUpdateBlogType } from "../../types/blogsType"

type IdBlogsType = string | null | undefined

export const blogsRepository = {
  getBlogs() {
    return db.blogs
  },
  findBlogById(id: IdBlogsType): BlogType | undefined {
    if (id) {
      const findBlogById = db.blogs.find((blog) => blog.id === id)
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

    db.blogs.push(newBlog)
    return newBlog
  },
  deleteBlog(id: IdBlogsType): boolean {
    for (let index = 0; index < db.blogs.length; index++) {
      if (db.blogs[index].id === id) {
        db.blogs.splice(index, 1);
        return true
      }
    }
    return false
  },
  updateBlog(id: IdBlogsType, inputBlog: CreateUpdateBlogType): boolean {
    for (let index = 0; index < db.blogs.length; index++) {
      const blog = db.blogs[index];
      if (blog.id === id) {
        db.blogs.splice(index, 1, {
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