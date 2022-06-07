const Datastore = require('nedb');

module.exports.initUsersDB = () => {
  const db = {};
  db.users = new Datastore({ filename: 'NeDB/users', autoload: true });
  return db.users
}

module.exports.initAutoServicesDB = () => {
  const db = {};
  db.autoServices = new Datastore({ filename: 'NeDB/autoServices', autoload: true });
  return db.autoServices
}

module.exports.initCarsDB = () => {
  const db = {};
  db.cars = new Datastore({ filename: 'NeDB/cars', autoload: true });
  return db.cars
}