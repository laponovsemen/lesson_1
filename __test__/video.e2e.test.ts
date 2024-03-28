import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { db, setDB } from '../src/db/db'
import { dataset1, dataset2, video1 } from './dataset'
import { ResolutionsEnum, TypeRequestEnum } from '../src/videos/enums/videos-enum'
import { InputForCreateVideoType } from '../src/videos/types/videos-types'
import { videoValidator } from '../src/validators/validators'

describe('/videos', () => {
  beforeAll(async () => {
    await req.delete('/testing/all-data')
  })

  // --- GET --- //
  it('get /videos', async () => {
    setDB(dataset1);

    const res = await req
      .get(SETTINGS.PATH.VIDEOS)
      .expect(200)

    expect(res.body.length).toBe(1)
  })
  //
  it('get by id /videos/id', async () => {
    const setId = 23
    const dataWithVideoId = dataset2(setId)
    setDB(dataWithVideoId);

    const res = await req
      .get(`${SETTINGS.PATH.VIDEOS}/${setId}`)
      .expect(200)

    expect(res.body.id).toBe(setId)
  })
})

// ---- POST --- //
it('should create', async () => {
  setDB()
  const newVideo: InputForCreateVideoType = {
    title: 'new video1',
    author: 'other',
    availableResolutions: [ResolutionsEnum.P144]
  }

  const res = await req
    .post(SETTINGS.PATH.VIDEOS)
    .send(newVideo)
    .expect(201)

  expect(db.videos.length).toBe(1)
  expect(res.body.title).toEqual('new video1')
  expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
})

it('ERORR while video create in availableResolutions incorrect values', async () => {
  setDB()
  const newVideo: any = {
    title: 'new video1',
    author: 'other',
    availableResolutions: ['asd']
  }

  const res = await req
    .post(SETTINGS.PATH.VIDEOS)
    .send(newVideo)
    .expect(400)

  expect(res.body.errorsMessages.length).toBe(1)
  expect(res.body.errorsMessages[0].message).toEqual('incorrect values asd')
})
//
it('ERORR while video create max length title', async () => {
  setDB()
  const newVideo: InputForCreateVideoType = {
    title: 'new video1new video1new video1new video1new video1new video1new video1new video1new video1new video1new video1new video1new video1new video1new',
    author: 'other',
    availableResolutions: [ResolutionsEnum.P144]
  }

  const res = await req
    .post(SETTINGS.PATH.VIDEOS)
    .send(newVideo) // отправка данных
    .expect(400)

  expect(res.body.errorsMessages.length).toBe(1)
  expect(res.body.errorsMessages[0].message).toEqual('video title max length = 40')
})
//
it('ERORR while video create max length author', async () => {
  setDB()
  const newVideo: InputForCreateVideoType = {
    title: 'new video1new',
    author: 'other otherotherotherotherotherotherotherotherotherotherotherotherother',
    availableResolutions: [ResolutionsEnum.P144]
  }

  const res = await req
    .post(SETTINGS.PATH.VIDEOS)
    .send(newVideo) // отправка данных
    .expect(400)

  expect(res.body.errorsMessages.length).toBe(1)
  expect(res.body.errorsMessages[0].message).toEqual('video author max length = 20')
})

// --- DELETE --- //
it('delete video by Id', async () => {
  setDB();
  setDB(dataset1);
  const setId = 23
  const dataWithVideoId = dataset2(setId)
  setDB(dataWithVideoId);

  const res = await req
    .delete(`${SETTINGS.PATH.VIDEOS}/${setId}`)
    .expect(204)

  expect(db.videos.length).toBe(1)
  expect(db.videos[0].id).not.toBe(setId)
})
//
it('ERROR find by Id', async () => {
  setDB();
  setDB(dataset1);
  const setId = 23
  const dataWithVideoId = dataset2(setId)
  setDB(dataWithVideoId);

  const res = await req
    .delete(`${SETTINGS.PATH.VIDEOS}/${4052}`)
    .expect(404)

  expect(res.statusCode).toBe(404)
})

// --- PUT --- //
it('update video by Id', async () => {
  setDB();
  setDB(dataset1);
  const setId = 23
  const dataWithVideoId = dataset2(setId)
  setDB(dataWithVideoId);
  
  const cangedTitle = 'my new title'
  const changedVideo = video1(setId, cangedTitle)
  
  const res = await req
    .put(`${SETTINGS.PATH.VIDEOS}/${setId}`)
    .send(changedVideo)
    .expect(201)

  expect(db.videos.length).toBe(2)
  expect(res.body.title).toEqual(cangedTitle)
})
//
it('ERROR file type shoul be boolean', async () => {
  setDB();
  setDB(dataset1);
  const setId = 23
  const dataWithVideoId = dataset2(setId)
  setDB(dataWithVideoId);
  
  const canBeDownloaded = 'string'
  const cangedTitle = 'my new title'
  const changedVideo = video1(setId, cangedTitle, canBeDownloaded)
  
  const res = await req
    .put(`${SETTINGS.PATH.VIDEOS}/${setId}`)
    .send(changedVideo)
    .expect(400)

    expect(res.body.errorsMessages.length).toBe(1)
    expect(res.body.errorsMessages[0].message).toEqual('video canBeDownloaded type shoul be boolean')
})