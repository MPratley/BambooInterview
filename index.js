'use strict'

const path = require('path')
const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')
const hbs = require('koa-hbs')

const db = require('./models/index')

const app = new Koa()
exports.app = app

// statically serve assets
app.use(mount('/', serve('./static')))

// load the handlebars middlewear
app.use(hbs.middleware({
  viewPath: path.resolve(__dirname, './views'),
  layoutsPath: path.resolve(__dirname, './views/layouts'),
  defaultLayout: 'main'
}))

// Load routes
require('./routes')

// Sync database with model and start server
db.sequelize.sync(
  (err) => {
    console.log('database sync error: ' + err)
    process.exit(1)
  }).then(() => {
  app.listen(3000, () => console.log('\n\nrunning on port 3000, http://localhost:3000'))
})

process.on('SIGINT', function exit () {
  console.log('\nApplication Quitting\n')
  process.exit()
})
