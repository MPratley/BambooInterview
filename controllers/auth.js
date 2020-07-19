'use strict'

module.exports.login = {
  get: async (ctx) => {
    // if (ctx.isAuthenticated()) {
    //   user = ctx.session.passport.user
    // }
    await ctx.render('login', {
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
