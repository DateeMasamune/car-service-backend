const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const app = express()
app.use(passport.initialize())
require('./middleware/passport')(passport)

const controller = require('./controllers/auth')
// const authRoutes = require('./routes/auth')
const carRoutes = require('./routes/car')
const autoServiceRoutes = require('./routes/autoService')

app.use(passport.initialize())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth/register',controller.register)
app.use('/api/car',carRoutes)
app.use('/api/autoService',autoServiceRoutes)

module.exports = app