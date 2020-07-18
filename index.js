'use strict'

const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')

const db = require('./models/index')

const app = new Koa()

// statically serve assets
app.use(mount('/', serve('./static')))

app.use(async ctx => {
  ctx.body = 'Hello World'
})

db.sequelize.sync(
  (err) => {
    console.log('database sync error: ' + err)
    process.exit(1)
  }).then(() => {
  app.listen(3000, () => console.log('\n\nrunning on port 3000, http://localhost:3000'))
})
