const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    console.log('get request')
    const blogs = await  Blog
        .find({})
    response.json(blogs.map(blog => blog.toJSON()))
    /*  Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        }) */
})

blogRouter.post('/', async (request, response) => {
    console.log(request.body)

    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => console.log(error))
})
// eslint-disable-next-line no-unused-vars
blogRouter.delete('/', (req, res) => {
    console.log('delete request')
})
module.exports = blogRouter
