const passport = require('koa-passport')
const db = require('./index').db

passport.serializeUser(function (user, done) {
  done(null, user.email)
})

passport.deserializeUser(async function (email, done) {
  try {
    const user = await db.user.findOne({ where: { email: email } })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function (username, password, done) {
  db.user.findOne({ where: { email: username } })
    .then(user => {
      if (user) {
        user.comparePassword(password).then(isPass => {
          if (isPass) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err))
}))
