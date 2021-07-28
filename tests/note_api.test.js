const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
  
test('there are eight blogs', async () => {
    const response = await api.get('/api/blogs')
  
    await expect(response.body).toHaveLength(8)
})

afterAll(() => {
    mongoose.connection.close()
})