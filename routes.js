'use strict'

const app = require('./index.js').app
const Router = require('koa-router')
const router = new Router()

router.get('/login', async (ctx) => {
  await ctx.render('login', {
    title: 'Bambank'
  })
})

router.redirect('/', '/login')

app.use(router.routes())
app.use(router.allowedMethods())
