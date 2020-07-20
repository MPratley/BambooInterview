const db = require('./../index').db

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
    attributes: ['date', 'balance', 'message']
  })
}

module.exports.account = async (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.redirect('/login')
  } else {
    await ctx.render('account', {
      // An example of passing parameters through to *handlebars*
      displayName: ctx.state.user.displayName(),
      userBalance: ctx.state.user.balance,
      userTransactions: await listUserTransfers(ctx.state.user.identifier)
    })
  }
}
