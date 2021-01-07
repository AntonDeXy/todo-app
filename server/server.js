require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const authController = require('./controllers/auth-controller')
const authenticateToken = authController.authenticateToken 

const todosController = require('./controllers/todos-controller')

const dbName = 'test'
const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.smobz.mongodb.net/${dbName}?retryWrites=true&w=majority`

// app.use(express.bodyParser({limit: '50mb'}))
app.use(express.json({limit: '50mb'}))
app.use(morgan('tiny'))
app.use(cors('*'))

// todos
app.get('/todo/get', authenticateToken, todosController.getTodosByUsername)

app.post('/todo/create', authenticateToken, todosController.createTodo)

app.delete('/todo/delete/:todoId', authenticateToken, todosController.removeTodo)

app.put('/todo/change-status/:todoId', authenticateToken, todosController.changeStatus)

// auth
app.post('/new-token', authController.getNewTokenByRefreshToken)

app.delete('/logout', authController.logout)

app.post('/signIn', authController.login)

app.post('/signUp', authController.register)

// start server
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true },(err) => {
  if (err)
    throw err
  console.log('DB connected')
  app.listen(5000, () => console.log('Server started'))
})