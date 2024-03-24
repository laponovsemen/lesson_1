import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { db, setDB } from '../src/db/db'
import { dataset1, dataset2 } from './dataset'
import { InputVideoType, ResolutionsEnum } from '../src/db/video-db-type'
import { createVideoValidator } from '../src/videos/controllers/createVideoController'

describe('/videos', () => {
  beforeAll(async () => {
    // awair req.delete('/testing/all-data')
  })

  // --- GET --- //

  it('get /videos', async () => {
    setDB(dataset1);

    const res = await req
      .get(SETTINGS.PATH.VIDEOS)
      .expect(200)

    expect(res.body.length).toBe(1)
  })

  it('get by id /videos/id', async () => {
    const setId = 23
    const dataWithVideoId = dataset2(setId)
    setDB(dataWithVideoId);

    const res = await req
      .get(`${SETTINGS.PATH.VIDEOS}/23`)
      .expect(200)

    // console.log('------------', res.body)

    expect(res.body.id).toBe(setId)
    //expect(res.body[0]).toEqual(dataset1.videos[0])
  })
})

// ---- POST --- //

it('should create', async () => {
  setDB()
  const newVideo: InputVideoType = {
    title: 'new video1',
    author: 'other',
    availableResolutions: [ResolutionsEnum.P144]
  }

  const res = await req
    .post(SETTINGS.PATH.VIDEOS)
    .send(newVideo) // отправка данных
    .expect(201)

  expect(db.videos.length).toBe(1)
  expect(db.videos[0].title).toEqual('new video1')
  expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
})

it('ERORR while video create in availableResolutions incorrect values', async () => {
  setDB()
  const newVideo: any = {
    title: 'new video1',
    author: 'other',
    availableResolutions: ['asd']
  }

  const error = createVideoValidator(newVideo); 

  const res = await req
    .post(SETTINGS.PATH.VIDEOS)
    .send(createVideoValidator(newVideo)) // отправка данных
    .expect(400)

  expect(error.errorsMessages.length).toBe(1)
  expect(error.errorsMessages[0].message).toEqual('incorrect values asd')
})

// --- DELETE --- //
it('delete video by Id', async () => {
  setDB();
  setDB(dataset1);
  const setId = 23
  const dataWithVideoId = dataset2(setId)
  setDB(dataWithVideoId);

  console.log('before => ', db.videos);

  const res = await req
    .delete(`SETTINGS.PATH.VIDEOS/${setId}`)
    .expect(204)

console.log('after => ', db.videos);
  console.log('+++++++++   ', res.status);

  expect(db.videos.length).toBe(1)
})