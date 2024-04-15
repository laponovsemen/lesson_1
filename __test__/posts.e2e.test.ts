import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { db, loginPassword, setDB } from '../src/db/db'
import { dataset1, createPost } from './dataset'
import { CreateUpdatePostType } from '../src/types/postsTypes'
import { converStringIntoBase64 } from '../src/helpers/helpers'

const invalidPost: CreateUpdatePostType = {
  title: 'length 31 symbols sssssssssssss',
  blogId: '123',
  content: 'length 101 symbols ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
  shortDescription: 'length 101 symbols ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
}

describe(SETTINGS.PATH.POSTS, () => {
  beforeAll(async () => {
    await req.delete('/testing/all-data')
  })

  // --- GET --- //
  it('get /videos', async () => {
    setDB(dataset1);

    const res = await req
      .get(SETTINGS.PATH.POSTS)
      .expect(200)

    expect(res.body.length).toBe(1)
  })
  //  
  it('get by id /post/id', async () => {
    const post1 = createPost()
    const setId = '23'
    const post2 = { ...createPost(), id: setId }
    setDB({ posts: [post1, post2] })

    const res = await req
      .get(`${SETTINGS.PATH.POSTS}/${setId}`)
      .expect(200)

    expect(db.posts.length).toBe(2)
    expect(res.body.id).toBe(setId)
  })

  // ---- POST --- //
  it('should create post', async () => {
    setDB()
    const newPost: CreateUpdatePostType = {
      title: 'new post',
      blogId: '123',
      content: 'bla bla bla bla bla',
      shortDescription: '...short Description...'
    }
    const codedAuth = converStringIntoBase64(loginPassword)

    const res = await req
      .post(SETTINGS.PATH.POSTS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(newPost)
      .expect(201)

    expect(db.posts.length).toBe(1)
    expect(res.body.title).toEqual('new post')
    expect(res.body.content).toEqual(newPost.content)
  })

  //
  it('ERORR invalid post title, shortDescription, content', async () => {
    setDB()
    const codedAuth = converStringIntoBase64(loginPassword)


    const res = await req
      .post(SETTINGS.PATH.POSTS)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(invalidPost)
      .expect(400)

    expect(res.body.errorsMessages.length).toBe(3)
    expect(res.body.errorsMessages[0].message).toEqual('max length is 30 letters')
    expect(res.body.errorsMessages[0].field).toEqual('title')
    expect(res.body.errorsMessages[1].message).toEqual('max length is 100 letters')
    expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
    expect(res.body.errorsMessages[2].message).toEqual('max length is 1000 letters')
    expect(res.body.errorsMessages[2].field).toEqual('content')
  })


  // --- DELETE --- //
  it('delete post by Id', async () => {
    setDB();
    const setId = '23'
    const post = {
      ...createPost(),
      id: setId
    }
    setDB({ posts: [createPost(), post] });

    const codedAuth = converStringIntoBase64(loginPassword)
    await req
      .delete(`${SETTINGS.PATH.POSTS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(204)

    expect(db.posts.length).toBe(1)
    expect(db.posts[0].id).not.toBe(setId)
  })
  //
  it('ERROR not delete by Id', async () => {
    setDB();
    const setId = '23'
    const post = {
      ...createPost(),
      id: setId
    }
    setDB({ posts: [createPost(), post] });

    const codedAuth = converStringIntoBase64(loginPassword)
    const res = await req
      .delete(`${SETTINGS.PATH.POSTS}/${4052}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .expect(404)
    expect(res.statusCode).toBe(404)
  })

  // --- PUT --- //
  it('update post by Id', async () => {
    setDB();
    const setId = '23'
    const post = {
      ...createPost(),
      id: setId
    }
    setDB({ posts: [createPost(), post] });

    const cangedTitle = 'changed title'
    const changedPost: CreateUpdatePostType = {
      title: cangedTitle,
      content: post.content,
      shortDescription: post.shortDescription,
      blogId: post.blogId,
    }

    const codedAuth = converStringIntoBase64(loginPassword)
    const res = await req
      .put(`${SETTINGS.PATH.POSTS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(changedPost)
      .expect(204)
    const findedPost = db.posts.find((post) => post.id === setId)
    expect(db.posts.length).toBe(2)
    expect(res.statusCode).toEqual(204)
    expect(findedPost?.title).toEqual(cangedTitle)
    expect(findedPost?.id).toEqual(setId)
  })

  //
  it('Error update post by Id', async () => {
    setDB();
    const setId = '23'
    const post = {
      ...createPost(),
      id: setId
    }
    setDB({ posts: [createPost(), post] });
    const codedAuth = converStringIntoBase64(loginPassword)
    const res = await req
      .put(`${SETTINGS.PATH.POSTS}/${setId}`)
      .set({ 'Authorization': 'Basic ' + codedAuth })
      .send(invalidPost)
      .expect(400)

    const findedPost = db.posts.find((post) => post.id === setId)
    expect(db.posts.length).toBe(2)
    expect(res.statusCode).toEqual(400)
    expect(res.body.errorsMessages.length).toBe(3)
    expect(res.body.errorsMessages[0].message).toEqual('max length is 30 letters')
    expect(res.body.errorsMessages[0].field).toEqual('title')
    expect(res.body.errorsMessages[1].message).toEqual('max length is 100 letters')
    expect(res.body.errorsMessages[1].field).toEqual('shortDescription')
    expect(res.body.errorsMessages[2].message).toEqual('max length is 1000 letters')
    expect(res.body.errorsMessages[2].field).toEqual('content')
  })
})