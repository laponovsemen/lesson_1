import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { db, setDB } from '../src/db/db'
import { dataset1, dataset2 } from './dataset'
import { InputVideoType, ResolutionsEnum } from '../src/db/video-db-type'

describe('/videos', () => {
  beforeAll(async () => {
    // awair req.delete('/testing/all-data')
  })

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

    console.log('------------', res.body)

    expect(res.body.id).toBe(setId)
    //expect(res.body[0]).toEqual(dataset1.videos[0])
  })
})

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
it('ERORR should create', async () => {
  setDB()
  const newVideo: any = {
    title: 'new video1',
    author: 'other',
    availableResolutions: ['asd']
  }

  const res = await req
    .post(SETTINGS.PATH.VIDEOS)
    .send(newVideo) // отправка данных
    .expect(400)

  console.log();
  

  expect(db.videos.length).toBe(1)
  expect(db.videos[0].title).toEqual('new video1')
  expect(res.body.availableResolutions).toEqual(newVideo.availableResolutions)
})
// ...
// it('shouldn\'t find', async () => {
//     setDB(dataset1)
//
//     const res = await req
//         .get(PATH.VIDEOS + '/1')
//         .expect(404) // проверка на ошибку
// ...