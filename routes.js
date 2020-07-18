'use strict'

const app = require('./index.js').app
const Router = require('koa-router')
const router = new Router()

router.get('/', async (ctx) => {
  await ctx.render('index', {
    title: 'Bambank'
  })
})

app.use(router.routes())
app.use(router.allowedMethods())
