'use strict'
const bodyParser = require('koa-body')
const Router = require('koa-router')
const passport = require('koa-passport')

const app = require('./index.js').app
const router = new Router()

// Authentication Routes
const auth = require('./controllers/auth')
router.get('/login', auth.login.get)
router.post('/login', bodyParser(),
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/'
  }))
router.get('/logout', auth.logout)

// Application Routes
router.get('/app', async (ctx) => {
  if (ctx.isAuthenticated()) ctx.body = 'Yay'
  else ctx.body = 'nay'
})

// For now, the index can just send people to login
router.redirect('/', '/login')

app.use(router.routes())
app.use(router.allowedMethods())
