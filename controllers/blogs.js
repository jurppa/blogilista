const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {

    //console.log('get request')
    const blogs = await  Blog
        .find({})
    response.json(blogs.map(blog => blog.toJSON()))
  
})

blogRouter.post('/', async (request, res) => {
    const blog = new Blog(request.body)

    try { 
        const savedBlog = await blog.save()
        res.json(savedBlog.toJSON())
    } catch(exception) {
        res.sendStatus(400)
    }
})

blogRouter.delete('/:id', async (req, res) => {
    
    //console.log('delete request')
    
    try {
       
        await Blog.findByIdAndRemove(req.params.id.toString().trim() )
        res.sendStatus(204)

    } catch (error) { res.sendStatus(404)
        
    }
})

blogRouter.put('/:id', async(req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.id.toString().trim(),req.body)
        res.sendStatus(200)
    } catch (error) {

        res.sendStatus(400)
        
    }
})
module.exports = blogRouter
