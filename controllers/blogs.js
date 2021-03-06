const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
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
        .find({}).populate('user').populate('comments')
    response.json(blogs.map(blog => blog.toJSON()))
  
})

blogRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body)
    console.log('USER: ')
    
    if(blog.title === undefined || blog.url === undefined) {res.send(400).end()}
    if(!req.token) {res.sendStatus(401).end()} 
    
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    if(user === null) {console.log('user is null'); res.status(401).end()}
    console.log('USER: ', user)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' }).end()
    } 
    const authedUser = await User.findById(decodedToken.id)
    blog.user = authedUser

    try { 
      
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        res.json(savedBlog.toJSON())


    

    } catch(exception) {
        console.log(exception)
    }
})

blogRouter.delete('/:id', async (req, res) => {
    console.log('delete kutsu')
    const deletenId = req.params.id.toString().trim()
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' }).end()
    } 
    const authedUser = await User.findById(decodedToken.id)
    console.log('authed user', authedUser.id)
  
    const blogToDelete = await Blog.findById(deletenId)
    if(blogToDelete == null) {res.send(400).end()}
    if(authedUser.id === blogToDelete.user.toString()) {
        try {
            console.log('tulee deleteen idll??', deletenId)
            await Blog.findByIdAndRemove( req.params.id )
            res.send(200).end()
        } catch {res.send(400).end()}
       
    } else {res.send(400).end()}

    
})

blogRouter.put('/:id', async(req, res) => {


    try {
        await Blog.findByIdAndUpdate(req.params.id.toString().trim(),req.body)
        res.sendStatus(200)

    } catch (error) {

        res.sendStatus(400)
        
    }
})
blogRouter.post('/:id/comments', async(req,res) => {
    console.log('kommenttirouter')
    try {
        const comment = new Comment({content: req.body.content})
        const savedComment = await comment.save()
        console.log('savedComment', savedComment)
        const blogToComment = await Blog.findById(req.params.id.toString().trim())
        blogToComment.comments = blogToComment.comments.concat(savedComment)
        await blogToComment.save()
        res.sendStatus(200)
    } catch (error) {
        console.log(req.params.id)


        console.log(error)
        res.sendStatus(400)
    }
})



module.exports = blogRouter
