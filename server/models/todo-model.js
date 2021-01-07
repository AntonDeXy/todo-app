const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  content: {
    required: true,
    type: String
  },
  creator: {
    required: true,
    type: String
  },
  isCompleted: {
    default: false,
    type: Boolean
  },
  img: {
    required: false,
    type: String
  },
  date: {
    required: true,
    type: Date
  }
}, { timestamps: true, collection: 'todos' })

module.exports = mongoose.model('ToDo', todoSchema)