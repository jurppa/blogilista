const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


/* const getTokenFrom = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
} */
blogRouter.get('/', async (request, response) => {

    //console.log('get request')
    const blogs = await  Blog
        .find({}).populate('user')
    response.json(blogs.map(blog => blog.toJSON()))
  
})

blogRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    const user = await User.findOne({})

    //const token = getTokenFrom(req)

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    console.log('decoded token: ', decodedToken)

    if (!decodedToken.id) {
        console.log('eka if')
        return res.status(401).json({ error: 'token missing or invalid' })
    } 
    const authedUser = await User.findById(decodedToken.id)
    blog.user = authedUser

    try { 
      
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        //res.json(savedBlog.toJSON())
    

    } catch(exception) {
        console.log(exception)
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
