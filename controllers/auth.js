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
    await db.user.findOrCreate({
      where: { email: request.email },
      defaults: {
        email: request.email,
        fullName: request.name,
        nickname: request.nickname,
        password: request.password,
        balance: 0
      }
    }).then((res) => {
      if (res[0]) return ctx.redirect('/login#AccountCreated')
      else return ctx.redirect('/signup#Error')
    })
  }
}
