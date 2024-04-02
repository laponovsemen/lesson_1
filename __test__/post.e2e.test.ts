import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { db, setDB } from '../src/db/db'
import { dataset1, createPost } from './dataset'
import { CreateUpdatePostType } from '../src/types/posts-types'

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
    const post2 = {...createPost(), id: setId}
    setDB({posts: [post1, post2]})

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

  const res = await req
    .post(SETTINGS.PATH.POSTS)
    .send(newPost)
    .expect(201)

  expect(db.posts.length).toBe(1)
  expect(res.body.title).toEqual('new post')
  expect(res.body.content).toEqual(newPost.content)
})

//
it('ERORR invalid post title, shortDescription, content', async () => {
  setDB()
  const newPost: CreateUpdatePostType = {
    title: 'length 31 symbols sssssssssssss',
    blogId: '123',
    content: 'length 101 symbols ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
    shortDescription: 'length 101 symbols ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
  }

  const res = await req
    .post(SETTINGS.PATH.POSTS)
    .send(newPost)
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
  setDB({posts: [createPost(), post]});

  await req
    .delete(`${SETTINGS.PATH.POSTS}/${setId}`)
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
  setDB({posts: [createPost(), post]});

  const res = await req
    .delete(`${SETTINGS.PATH.POSTS}/${4052}`)
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
  setDB({posts: [createPost(), post]});

  const cangedTitle = 'changed title'
  const changedPost: CreateUpdatePostType = {
    title: cangedTitle,
    content: post.content,
    shortDescription: post.shortDescription,
    blogId: post.blogId,
  }

  const res = await req
    .put(`${SETTINGS.PATH.POSTS}/${setId}`)
    .send(changedPost)
    .expect(204)

  const findedPost = db.posts.find((post) => post.id === setId)
  expect(db.posts.length).toBe(2)
  expect(res.statusCode).toEqual(204)
  expect(findedPost?.title).toEqual(cangedTitle)
  expect(findedPost?.id).toEqual(setId)
})

// //
// it('ERROR file type shoul be boolean', async () => {
//   setDB();
//   setDB(dataset1);
//   const setId = 23
//   const dataWithVideoId = dataset2(setId)
//   setDB(dataWithVideoId);

//   const canBeDownloaded = 'string'
//   const cangedTitle = 'my new title'
//   const changedVideo = video1(setId, cangedTitle, canBeDownloaded, 5)

//   const res = await req
//     .put(`${SETTINGS.PATH.VIDEOS}/${setId}`)
//     .send(changedVideo)
//     .expect(400)

//   expect(res.body.errorsMessages.length).toBe(1)
//   expect(res.body.errorsMessages[0].message).toEqual('video canBeDownloaded type shoul be boolean')
// })

// //
// it('ERROR minAgeRestriction max 18', async () => {
//   setDB();
//   setDB(dataset1);
//   const setId = 23
//   const dataWithVideoId = dataset2(setId)
//   setDB(dataWithVideoId);

//   const minAgeRestriction = 19
//   const cangedTitle = 'my new title'
//   const changedVideo = video1(setId, cangedTitle, false, minAgeRestriction)

//   const res = await req
//     .put(`${SETTINGS.PATH.VIDEOS}/${setId}`)
//     .send(changedVideo)
//     .expect(400)

//   expect(res.body.errorsMessages.length).toBe(1)
//   expect(res.body.errorsMessages[0].message).toEqual('video minAgeRestriction max 18')
// })

// //
// it('ERROR minAgeRestriction min 1', async () => {
//   setDB();
//   setDB(dataset1);
//   const setId = 23
//   const dataWithVideoId = dataset2(setId)
//   setDB(dataWithVideoId);

//   const minAgeRestriction = 0
//   const cangedTitle = 'my new title'
//   const changedVideo = video1(setId, cangedTitle, false, minAgeRestriction)

//   const res = await req
//     .put(`${SETTINGS.PATH.VIDEOS}/${setId}`)
//     .send(changedVideo)
//     .expect(400)

//   expect(res.body.errorsMessages.length).toBe(1)
//   expect(res.body.errorsMessages[0].message).toEqual('video minAgeRestriction min 1')
// })

// //
// it('ERROR publicationDate is not date', async () => {
//   setDB();
//   setDB(dataset1);
//   const setId = 23
//   const dataWithVideoId = dataset2(setId)
//   setDB(dataWithVideoId);

//   const publicationDate = 1995
//   const cangedTitle = 'my new title'
//   const changedVideo = video1(setId, cangedTitle, false, 5, publicationDate)

//   const res = await req
//     .put(`${SETTINGS.PATH.VIDEOS}/${setId}`)
//     .send(changedVideo)
//     .expect(400)

//   expect(res.body.errorsMessages.length).toBe(1)
//   expect(res.body.errorsMessages[0].message).toEqual('video publicationDate is not date')
})