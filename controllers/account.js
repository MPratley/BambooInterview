const db = require('./../index').db

const listUserTransfers = async (id, limit = 10) => {
  return db.transfer.findAll({
    order: [['createdAt', 'DESC']],
    limit: limit,
    where: {
      [db.Op.or]: [
        { senderIdentifier: id },
        { receiverIdentifier: id }
      ]
    }
  })
}

module.exports.account = async (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.redirect('/login')
  } else {
    listUserTransfers(ctx.state.user.identifier)
    await ctx.render('account', {
      // An example of passing parameters through to *handlebars*
      displayName: ctx.state.user.displayName(),
      userBalance: ctx.state.user.balance
    })
  }
}
