import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { db, loginPassword, setDB } from '../src/db/db'
import { dataset1, createBlog } from './dataset'
import { CreateUpdateBlogType } from '../src/types/blogsType'
import { converStringIntoBase64 } from '../src/helpers/helpers'

const invalidBlog: CreateUpdateBlogType = {
  name: 'length 16 symbols sssssssssssss',
  description: 'length 51 symbols ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
  websiteUrl: 'length 101 symbols  ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
}

describe(SETTINGS.PATH.BLOGS, () => {
  beforeAll(async () => {
    await req.delete('/testing/all-data')
  })

  // --- GET --- //
  it('get /blogs', async () => {
    setDB(dataset1);

    const res = await req
      .get(SETTINGS.PATH.BLOGS)
      .expect(200)

    expect(res.body.length).toBe(1)
  })
  //  
  it('get by id /blogs/id', async () => {
    const blog1 = createBlog()
    const setId = '23'
    const blog2 = { ...createBlog(), id: setId }
    setDB({ blogs: [blog1, blog2] })

    const res = await req
      .get(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .expect(200)

    expect(db.blogs.length).toBe(2)
    expect(res.body.id).toBe(setId)
  })

  // ---- POST --- //
  it('should create blog', async () => {
    setDB()
    const newBlog: CreateUpdateBlogType = {
      name: 'new blog',
      description: '...Description...',
      websiteUrl: 'https://www.leningrad.com'
    }

    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(newBlog)
      .expect(201)

    expect(db.blogs.length).toBe(1)
    expect(res.body.name).toEqual('new blog')
    expect(res.body.description).toEqual(newBlog.description)
  })

//
  it('ERORR invalid length blog: name, description, websiteUrl', async () => {
    setDB()

    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(invalidBlog)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(3)
    expect(res.body.errorsMessages[0].message).toEqual('max length is 15 letters')
    expect(res.body.errorsMessages[0].field).toEqual('name')
    expect(res.body.errorsMessages[1].message).toEqual('max length is 500 letters')
    expect(res.body.errorsMessages[1].field).toEqual('description')
    expect(res.body.errorsMessages[2].message).toEqual('max length is 100 letters')
    expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')
  })

  //
  it('ERORR invalid URL blog: websiteUrl', async () => {
    setDB()
    const newBlog = {
      name: 'name',
      description: '...description',
      websiteUrl: 'www.leningrad.www.ru'
    }
    const codedAuth = converStringIntoBase64(loginPassword)
    const res = await req
      .post(SETTINGS.PATH.BLOGS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(newBlog)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].message).toEqual('Invalid url')
    expect(res.body.errorsMessages[0].field).toEqual('websiteUrl')
  })

  // --- DELETE --- //
  it('delete blog by Id', async () => {
    setDB();
    const setId = '23'
    const blog = {
      ...createBlog(),
      id: setId
    }
    setDB({ blogs: [createBlog(), blog] });
    const codedAuth = converStringIntoBase64(loginPassword)

    await req
      .delete(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(204)

    expect(db.blogs.length).toBe(1)
    expect(db.blogs[0].id).not.toBe(setId)
  })

  //
  it('ERROR not delete by Id', async () => {
    setDB();
    const setId = '23'
    const blog = {
      ...createBlog(),
      id: setId
    }
    setDB({ blogs: [createBlog(), blog] });
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .delete(`${SETTINGS.PATH.BLOGS}/${4052}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(404)

    expect(res.statusCode).toBe(404)
  })

  // --- PUT --- //
  it('update blog by Id', async () => {
    setDB();
    const setId = '23'
    const blog = {
      ...createBlog(),
      id: setId
    }
    setDB({ blogs: [createBlog(), blog] });

    const cangedName = 'changed name'
    const changedPost: CreateUpdateBlogType = {
      name: cangedName,
      description: '...Description...',
      websiteUrl: 'https://www.leningrad.com'
    }
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .put(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(changedPost)
      .expect(204)

    const findedPost = db.blogs.find((post) => post.id === setId)
    expect(db.blogs.length).toBe(2)
    expect(res.statusCode).toEqual(204)
    expect(findedPost?.name).toEqual(cangedName)
    expect(findedPost?.id).toEqual(setId)
  })


  it('Error invalid length update blog: name, description, websiteUrl', async () => {
    setDB();
    const setId = '23'
    const blog = {
      ...createBlog(),
      id: setId
    }
    setDB({ blogs: [createBlog(), blog] });
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .put(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(invalidBlog)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(3)
    expect(res.body.errorsMessages[0].message).toEqual('max length is 15 letters')
    expect(res.body.errorsMessages[0].field).toEqual('name')
    expect(res.body.errorsMessages[1].message).toEqual('max length is 500 letters')
    expect(res.body.errorsMessages[1].field).toEqual('description')
    expect(res.body.errorsMessages[2].message).toEqual('max length is 100 letters')
    expect(res.body.errorsMessages[2].field).toEqual('websiteUrl')
  })

  //
  it('Error invalid update blog: websiteUrl', async () => {
    setDB();
    const setId = '23'
    const blog = {
      ...createBlog(),
      name: 'just name',
      id: setId
    }
    setDB({ blogs: [createBlog(), blog] });
    const codedAuth = converStringIntoBase64(loginPassword)

    const chengedBlog = {
      ...blog,
      websiteUrl: 'www.leningrad.www.ru'
    }
    const res = await req
      .put(`${SETTINGS.PATH.BLOGS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(chengedBlog)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].message).toEqual('Invalid url')
    expect(res.body.errorsMessages[0].field).toEqual('websiteUrl')
  })
})