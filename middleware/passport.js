const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const db = require('../NeDB/NeDBInit')

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.jwt
}

module.exports = passport => {
	passport.use(
		new JwtStrategy(options, async (payload, done) => {
			try {
				db.users.findOne({ _id: payload.userId}, (err, user) => {
					if (user) {
						done(null, user)
					} else {
						done(null, false)
					}
				})
			} catch (e) {
				console.log(e)
			}
		})
	)
}