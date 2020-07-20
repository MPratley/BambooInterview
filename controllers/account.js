const db = require('./../index').db
const hbs = require('koa-hbs')

const listUserTransfers = async (id, limit = 10) => {
  return db.transfer.findAll({
    raw: true,
    order: [['createdAt', 'DESC']],
    limit: limit,
    where: {
      [db.Op.or]: [
        { senderIdentifier: id },
        { receiverIdentifier: id }
      ]
    },
    attributes: ['date', 'balance', 'message', 'receiverIdentifier', 'senderIdentifier']
  })
}

hbs.registerHelper('eq', function (arg1, arg2) {
  return (arg1 === arg2)
})
hbs.registerHelper('neq', function (arg1, arg2) {
  return (arg1 !== arg2)
})

module.exports.index = async (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.redirect('/login')
  } else {
    await ctx.render('account', {
      // An example of passing parameters through to *handlebars*
      displayName: ctx.state.user.displayName(),
      userId: ctx.state.user.identifier,
      userBalance: await ctx.state.user.getBalance(),
      userTransactions: await listUserTransfers(ctx.state.user.identifier)
    })
  }
}

module.exports.newTransfer = async (ctx) => {
  const request = ctx.request.body
  await db.user.findOne({
    where: {
      email: request.email
    }
  }).then(recipient => {
    if (recipient) {
      db.transfer.create({
        balance: request.amount,
        message: request.message,
        receiverIdentifier: recipient.identifier,
        senderIdentifier: ctx.state.user.identifier
      })
    }
  })
  await ctx.redirect('/#')
}
