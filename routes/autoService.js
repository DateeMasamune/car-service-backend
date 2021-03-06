const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('../controllers/autoService')

//localhost:4000/api/autoService/
router.post('/create', passport.authenticate('jwt',{session:false}), controller.create)
router.delete('/remove/:id', passport.authenticate('jwt',{session:false}), controller.remove)
// router.get('/allService/', passport.authenticate('jwt',{session:false}), controller.allService)
router.get('/allService/', controller.allService)
router.put('/updateService/:id', controller.updateService)

module.exports = router