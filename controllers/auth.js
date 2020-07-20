'use strict'

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
    await ctx.redirect('/')
  }
}
