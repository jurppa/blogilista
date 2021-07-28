const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('api get tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
  
    test('there are eight blogs', async () => {
        const response = await api.get('/api/blogs')
    
        await expect(response.body).toHaveLength(response.body.length)
    })
    test('identifier should be id', async() => {
        const response = await api.get('/api/blogs')

        await expect(response.body[0].id).toBeDefined()
    })})
describe('api post tests', () => {
    test('able to post blog', async() => {
        const testNote = {
            title: 'Testititle',
            author: 'Testaaja',
            url: 'www.testiblogi.fi',
            likes: 7}

        await api.post('/api/blogs').send(testNote).expect(200)

        const response = await api.get('/api/blogs')
        await expect(response.body).toHaveLength(response.body.length)
    
   
    })
    test('posted blog without likes should default to 0', async() => {
        const testNoteWithoutLikes = {
            title: 'Testiblogi',
            author: 'Testaaja',
            url: 'www.testiblogi.fi'
        }

        await api.post('/api/blogs').send(testNoteWithoutLikes)
        const response = await api.get('/api/blogs')
        await expect(response.body[response.body.length -1].likes).toBe(0)
    
   
    })
})
test('post should contain title and url, response should be 400 Bad request', async() => {
    const inadequateBlog = {
        
        author: 'Testaaja',
        
    }
    
    await api.post('/api/blogs').send(inadequateBlog).expect(400)
   
})
afterAll(() => {
    mongoose.connection.close()
})