export type PostType = {
  id:	string
  title:	string // maxLength: 30
  shortDescription:	string // maxLength: 100
  content:	string // maxLength: 1000
  blogId:	string
  blogName:	string
  createdAt: Date
}
export type InputPostType = {
  title:	string // maxLength: 30
  shortDescription:	string // maxLength: 100
  content:	string // maxLength: 1000
  blogId:	string
}