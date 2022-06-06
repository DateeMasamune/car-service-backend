const express = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const app = express()
app.use(passport.initialize())
require('./middleware/passport')(passport)

const User = require('../models/User')

const db = {};
db.users = new Datastore({ filename: 'NeDB/users.db', autoload: true });
db.users.loadDatabase();

const controller = require('./controllers/auth')
// const authRoutes = require('./routes/auth')
const carRoutes = require('./routes/car')
const autoServiceRoutes = require('./routes/autoService')

express.post('api/createuser', (req, res) => {
  const user =  new User(
    req.body.email,
    bcrypt.hashSync(password, salt),
    req.body.firstName,
    req.body.lastName,
    req.body.role,
  )
  db.users.insert(user, (err, user) => {
    console.log('err', err);
    if (!err) {
      console.log('user has been added', user);
    }
  })
  res.status(201).json(user)
})

express.get('api/getuser/:id', (req, res) => {
  db.users.findOne({ _id: req.params.id }, (err, user) => {
    if (user) {
      res.status(201).json(user)
    } else {
      res.status(404).json('token incorrect')
    }
  })
})

app.use(passport.initialize())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth/register',controller.register)
app.use('/api/car',carRoutes)
app.use('/api/autoService',autoServiceRoutes)

module.exports = app