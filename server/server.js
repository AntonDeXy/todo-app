const { resolve } = require('path')
require('dotenv').config({path: resolve(__dirname,"../.env")})
const PORT = process.env.PORT || 5000
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const authController = require('./controllers/auth-controller')
const authenticateToken = authController.authenticateToken 

const todosController = require('./controllers/todos-controller')

const MONGO_URI = process.env.MONGODB_URI

app.use(express.json({limit: '50mb'}))
app.use(morgan('tiny'))
app.use(cors('*'))

// share static
app.use(express.static(path.join(__dirname, '../client/build')))

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
  app.listen(PORT, () => console.log('Server started'))
})