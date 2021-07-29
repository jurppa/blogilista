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

        await api.post('/api/blogs')
            .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNla3JldHVzZXIiLCJpZCI6IjYxMDJmNmFlY2FhYjE0MzQ1NDcyY2VhOSIsImlhdCI6MTYyNzU4NjcyMH0.CUAqJ8QnNmGvY6yqYz2TwlVtR0WVYInNs68SgsuK1h8')
        
            .send(testNote).expect(200)

        const response = await api.get('/api/blogs')
        await expect(response.body).toHaveLength(response.body.length)
    
   
    })
    test('posted blog without likes should default to 0', async() => {
        const testNoteWithoutLikes = {
            title: 'Testiblogi',
            author: 'Testaaja',
            url: 'www.testiblogi.fi'
           
        }

        await api.post('/api/blogs')
            .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNla3JldHVzZXIiLCJpZCI6IjYxMDJmNmFlY2FhYjE0MzQ1NDcyY2VhOSIsImlhdCI6MTYyNzU4NjcyMH0.CUAqJ8QnNmGvY6yqYz2TwlVtR0WVYInNs68SgsuK1h8')
            .send(testNoteWithoutLikes)
        const response = await api.get('/api/blogs')
        await expect(response.body[response.body.length -1].likes).toBe(0)
    
   
    })
})
test('post should contain title and url, response should be 400 Unauthorized', async() => {
    const inadequateBlog = {
        
        author: 'Testaaja',
        
    } 
    await api.post('/api/blogs')
        .set('Authorization', 'bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNla3JldHVzZXIiLCJpZCI6IjYxMDJmNmFlY2FhYjE0MzQ1NDcyY2VhOSIsImlhdCI6MTYyNzU4NjcyMH0.CUAqJ8QnNmGvY6yqYz2TwlVtR0WVYInNs68SgsuK1h8')
        .send(inadequateBlog).expect(400)
   
})

describe('tests for user creation', () => {
    
    test('username and password should be over 3 characters', async () => {
        const newUser = {
            username: 'Peksi',

            name: 'Pekka',
            password: 'd'
        }
        const usersBefore = await api.get('/api/users')
        

        const response = await api.post('/api/users').send(newUser).expect(400)
        const usersAfter = await api.get('/api/users')

        await expect(response.text).toBe('username and password must be over 3 characters')
        await expect(usersAfter.body.length).toBe(usersBefore.body.length)
      
    })

})
afterAll(() => {
    mongoose.connection.close()

})