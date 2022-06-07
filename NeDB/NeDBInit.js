const Datastore = require('nedb');

db = {};
db.users = new Datastore({ filename: 'NeDB/users', autoload: true });
db.autoServices = new Datastore({ filename: 'NeDB/autoServices', autoload: true });
db.cars = new Datastore({ filename: 'NeDB/cars', autoload: true });
console.log(db);
module.exports = db