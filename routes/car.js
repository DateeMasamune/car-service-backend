const express = require('express')
const router = express.Router()
const passport = require('passport')

const controller = require('../controllers/car')

//localhost:4000/api/car/
router.post('/create', passport.authenticate('jwt',{session:false}), controller.create)
router.delete('/remove/:id', passport.authenticate('jwt',{session:false}), controller.remove)
router.get('/allCars', passport.authenticate('jwt',{session:false}), controller.allCars)
router.put('/updateCar/:id', passport.authenticate('jwt',{session:false}), controller.updateCar)

module.exports = router