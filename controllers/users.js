const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const body = req.body
    if(body.username.length < 3 || body.password.length < 3) 
    {
        res.status(400).send('username and password must be over 3 characters').end()
    }
    else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

    
        try {
            const savedUser = await user.save()

            res.json(savedUser)
        } catch (error) {
            res.status(400).send('Username must be unique.').end()
       
        }
    }
})
usersRouter.get('/', async(req, res) => {
    const users = await  User
        .find({}).populate('blogs')

    res.json(users.map(blog => blog.toJSON()))
})

module.exports = usersRouter