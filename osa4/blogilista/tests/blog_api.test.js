const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('there are two notes', async () => {
//   const response = await api.get('/api/notes')
  
//     expect(response.body).toHaveLength(2)
//   })

afterAll(async () => {
  await mongoose.connection.close()
})