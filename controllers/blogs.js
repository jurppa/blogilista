const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {

    //console.log('get request')
    const blogs = await  Blog
        .find({}).populate('user')
    response.json(blogs.map(blog => blog.toJSON()))
  
})

blogRouter.post('/', async (request, res) => {
    const blog = new Blog(request.body)
    const user = await User.findOne({})

    blog.user = user
 

    try { 
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
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
