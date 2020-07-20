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
    successRedirect: '/',
    failureRedirect: '/login#loginerror'
  }))
router.get('/signup', auth.signup.get)
router.get('/logout', auth.logout)

// Application Routes
const account = require('./controllers/account')
router.get('/', account.account)

app.use(router.routes())
app.use(router.allowedMethods())
