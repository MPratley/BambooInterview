'use strict'
const db = require('./../index').db

module.exports.login = {
  get: async (ctx) => {
    if (ctx.isAuthenticated()) {
      await ctx.redirect('/')
    } else {
      await ctx.render('login', {
        // An example of passing parameters through to handlebars
        title: 'Bambank'
      })
    }
  },
  post: async (ctx) => {
  }
}

module.exports.logout = async (ctx) => {
  ctx.logout()
  await ctx.redirect('/')
}

module.exports.signup = {
  get: async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout()
    }
    await ctx.render('signup', {
    })
  },
  post: async (ctx) => {
    const request = ctx.request.body
    db.user.findOrCreate({
      where: { email: request.email },
      defaults: {
        email: request.email,
        fullName: request.name,
        nickname: request.nickName,
        password: request.password,
        balance: 0
      }
    }).then((user, success) => {
      if (success) ctx.redirect('/login#AccountCreated')
      else ctx.redirect('/signup#Error')
    }).catch((err) => {
      console.log(err)
      ctx.redirect('/signup#Error')
    })
  }
}
