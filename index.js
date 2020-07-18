'use strict'

const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')

const app = new Koa()

// statically serve assets
app.use(mount('/', serve('./static')))

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000, () => console.log('running on port 3000, http://localhost:3000'))
