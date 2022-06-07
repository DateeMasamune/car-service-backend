const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const db = require('../NeDB/NeDBInit')

const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async (req, res) => {
	db.users.findOne({email: req.body.email}, (err, candidate) => {
    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
      if (passwordResult) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, keys.jwt, {expiresIn: 60 * 60})
        res.status(200).json({
          token: `Bearer ${token}`,
          userId: candidate._id,
          firstName: candidate.firstName,
          lastName: candidate.lastName,
          role: candidate.role
        })
      } else {
        res.status(401).json({
          message: 'Пароль не верный'
        })
      }
    } else {
      res.status(404).json({
        message: 'Пользователь с такой почтой не найден'
      })
    }
  })
}

module.exports.register = async (req, res) => {
	db.users.findOne({ email: req.body.email }, (err, candidate) => {
    if (candidate) {
      res.status(409).json({
        message: 'Такой емейл уже занят Попробуйте другой'
      })
    } else {
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password
      const user =  new User(
        req.body.email,
        bcrypt.hashSync(password, salt),
        req.body.firstName,
        req.body.lastName,
        req.body.role,
      )
      try {
        db.users.insert(user, (err, user) => {
          console.log('err', err);
          if (!err) {
            console.log('user has been added', user);
          }
        })
        res.status(201).json(user)
      } catch (error) {
        errorHandler(res, error)
      }
    }
  })
}

module.exports.user = async (req, res) => {
  console.log('user',req.params.id);
  db.users.findOne({ _id: req.params.id }, (err, user) => {
    if (user) {
      res.status(201).json(user)
    } else {
      res.status(404).json('token incorrect')
    }
  })
}