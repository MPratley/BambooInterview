'use strict'

const path = require('path')
const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')
const hbs = require('koa-hbs')
const session = require('koa-session')
const passport = require('koa-passport')

const db = require('./models/index')

const app = new Koa()
exports.app = app
exports.db = db

// statically serve assets
app.use(mount('/', serve('./static')))

// session and authentication
app.use(session(app))
app.use(passport.initialize())
app.use(passport.session())
// required for cookie signature generation.
// In a production application you'd want a way of managing multiple cryptographically secure session keys.
// For now this is fine though
app.keys = ['TEMPKEY']

// load the handlebars middlewear
app.use(hbs.middleware({
  viewPath: path.resolve(__dirname, './views'),
  layoutsPath: path.resolve(__dirname, './views/layouts'),
  defaultLayout: 'main'
}))

// Load passport strategies
require('./passport')
// Load routes
require('./routes')

// Sync database with model and start server
db.sequelize.sync(
  (err) => {
    console.log('database sync error: ' + err)
    process.exit(1)
  })
  .then(() => {
    db.user.findOrCreate({
      where: { email: 'jane@example.com' },
      defaults: { fullName: 'Jane', email: 'jane@example.com', password: 'password' }
    })
    app.listen(3000, () => console.log('\n\nrunning on port 3000, http://localhost:3000'))
  })

process.on('SIGINT', function exit () {
  console.log('\nApplication Quitting\n')
  process.exit()
})
