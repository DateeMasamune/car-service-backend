const AutoService = require('../models/AutoService')
const errorHandler = require('../utils/errorHandler')
const autoServicesDB = require('../NeDB/NeDBInit').initAutoServicesDB()


module.exports.create = async (req, res) => {
  const autoService = new AutoService(
    req.body.name,
    req.body.description,
    req.body.supportedСars,
    req.body.userId,
  )
  console.log('autoService',autoService);
  try {
    autoServicesDB.insert(autoService, (err, autoService) => {
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
  autoServicesDB.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (!err) {
      console.log('service has been removed', numRemoved);
      res.status(201).json(numRemoved)
    }
  })
}

module.exports.allService = async (req, res) => {
  autoServicesDB.find({}, (err, autoService) => {
    if (!err) {
      console.log('all service', autoService);
      res.status(201).json(autoService)
    }
  })
}