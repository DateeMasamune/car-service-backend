const AutoService = require('../models/AutoService')
const errorHandler = require('../utils/errorHandler')
const db = require('../NeDB/NeDBInit')


module.exports.create = async (req, res) => {
  const autoService = new AutoService(
    req.body.name,
    req.body.description,
    req.body.supportedСars,
    req.body.userId,
  )
  console.log('autoService',autoService);
  try {
    db.autoServices.insert(autoService, (err, autoService) => {
      if (!err) {
        console.log('service has been added', autoService);
        res.status(201).json(autoService)
      }
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  db.autoServices.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (!err) {
      console.log('service has been removed', numRemoved);
      res.status(201).json(numRemoved)
    }
  })
}

module.exports.allService = async (req, res) => {
  db.autoServices.find({}, (err, autoService) => {
    if (!err) {
      console.log('all service', autoService);
      res.status(201).json(autoService)
    }
  })
}