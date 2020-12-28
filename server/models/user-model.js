const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    required: true,
    unique: true,
    type: String
  },
  // email: {
  //   required: false,
  //   type: String
  // },
  password: {
    default: true,
    type: String
  },
}, { timestamps: true, collection: 'users' })

module.exports = mongoose.model('User', userSchema)