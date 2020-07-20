'use strict'

module.exports.login = {
  get: async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/')
    }
    await ctx.render('login', {
      // An example of passing parameters through to handlebars
      title: 'Bambank'
    })
  },
  post: async (ctx) => {
  }
}

module.exports.logout = async (ctx) => {
  ctx.logout()
  await ctx.redirect('/')
}
