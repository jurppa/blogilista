const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const usersRouter = require('./controllers/users')
const middleware = require('./utils/tokenExtractor')
const mongoUrl = process.env.MONGODB_URI
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('connected to mongodb')).catch((error) => console.log('error in connection:', error.message)) 
app.use(cors())
app.use(express.json())


app.use(middleware.getTokenFrom)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
module.exports = app