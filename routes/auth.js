const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('../controllers/auth')

//localhost:4000/api/auth/
router.post('/login',controller.login)
router.post('/register',controller.register)
router.get('/user/:id', passport.authenticate('jwt',{session:false}), controller.user)
module.exports = router