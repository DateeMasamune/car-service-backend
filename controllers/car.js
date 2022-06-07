const Datastore = require('nedb');
const Car = require('../models/Car')
const errorHandler = require('../utils/errorHandler')

const db = {};
db.cars = new Datastore({ filename: 'NeDB/cars', autoload: true });
db.cars.loadDatabase();

module.exports.create = async (req, res) => {
  console.log('req', req.body);
  const car = new Car(
    req.body.serviceId,
    req.body.brand,
    req.body.status,
    req.body.step,
    req.body.history,
    req.body.details,
    req.body.userId
  )
  try {
    db.cars.insert(car, (err, car) => {
      if (!err) {
        console.log('car has been added', car);
        res.status(201).json(car)
      }
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  db.cars.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (!err) {
      console.log('car has been removed', numRemoved);
      res.status(201).json(numRemoved)
    }
  })
}

module.exports.allCars = async (req, res) => {
  getAllCars(req, res)
}

module.exports.updateCar = async (req, res) => {
  db.cars.update({ _id: req.params.id }, req.body, {}, (err, car) => {
    if (!err) {
      getAllCars(req, res)
    } else {
      res.status(400).json('error')
    }
  })
}

function getAllCars(req, res) {
  db.cars.find({}, (err, cars) => {
    if (!err) {
      console.log('all cars', cars);
      res.status(201).json(cars)
    }
  })
}