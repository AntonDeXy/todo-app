const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user-model')
const refreshTokenModel = require('../models/refresh-token-model')

exports.register = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || username.length < 4) {
    return res.json({success: false, msg: 'Username length must be at least 4'})
  }

  if (!password || password.length < 8) {
    return res.json({success: false, msg: 'Password length must be at least 8'})
  }

  const isUsernameExist = await userModel.findOne({username})

  if (isUsernameExist) return res.json({success: false, msg: 'User with this username already exists'})

  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10)

    const user = new userModel({
      username,
      password: hashedPass
    })

    const createdUser = await user.save()
  
    res.json({success: true, user: createdUser})
  } catch(err) {
    throw err
    res.json({success: false, msg: err})
  }
}

exports.login = async (req, res) => {
  const password = req.body.password

  if (!password || password.length < 8) {
    return res.json({success: false, msg: 'Password length must be at least 8'})
  }

  const user = await userModel.findOne({username: req.body.username})

  if (!user) {
    return res.status(400).send({success: false, msg: 'User with this username not found'})
  }

  const isPasswordRight = await bcrypt.compare(password, user.password)

  if (isPasswordRight) {
    const accessToken = generateAccessToken(user._doc)
    const refreshToken = await generateRefreshToken(user._doc)
    
    return res.json({accessToken, refreshToken})
  } else {
    return res.status(200).send({success: false, msg: 'Password is not valid'})
  }
}

exports.getNewTokenByRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken
  if (!refreshToken) return res.sendStatus(401)

  const isTokenExists = refreshTokenModel.findOne({refreshToken})
  if (!isTokenExists) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken(user)
    res.json({accessToken})
  })
}

exports.logout = async (req, res) => {
  await refreshTokenModel.deleteOne({refreshToken: req.body.refreshToken})

  res.sendStatus(204)
}

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

function generateAccessToken(user) {
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

async function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)
  await new refreshTokenModel({refreshToken}).save()
  return refreshToken
}