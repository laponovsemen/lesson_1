export type BlogType = {
  id: string
  name: string
  description: string
  websiteUrl: string
  createdAt: Date
  isMembership: boolean
}

export type InputBlogType = {
  name: string
  description: string
  websiteUrl: string
}