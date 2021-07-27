const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', (request, response) => {
    console.log('get request')
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response) => {
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
