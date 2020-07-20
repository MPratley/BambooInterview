'use strict'

const path = require('path')
const { Sequelize, Op } = require('sequelize')

// For now, just use a local sqlite database
const dbFile = path.resolve(__dirname, '../.data/sqlite.db')
const sequelize = new Sequelize.Sequelize({
  dialect: 'sqlite',
  storage: dbFile
})

// Pull in the models
// This is automated by default, but that makes type checking a pain
const db = {
  user: require('./user')(sequelize, Sequelize.DataTypes),
  transfer: require('./transfer')(sequelize, Sequelize.DataTypes)
}

db.transfer.belongsTo(db.user, { as: 'sender' })
db.transfer.belongsTo(db.user, { as: 'receiver' })
db.user.belongsToMany(db.transfer, { through: 'usertransfers' })

// Extra Hooks
db.user.addHook('afterCreate', (user) => {
  db.transfer.create({ balance: 100, message: 'Welcome to Bambank! This is a complimentary 100 Bambeuros to get you started', receiverIdentifier: user.identifier })
})

// Extra Hooks
// Balance shouldn't actually be a direct property of users but a calculated and cached one. For now though, this is fine
db.transfer.addHook('beforeCreate', (transfer) => {
  db.user.findOne(
    { where: { identifier: transfer.receiverIdentifier } }
  ).then(user =>
    user.update({
      balance: user.balance + transfer.balance
    })
  )
  if (transfer.senderIdentifier) {
    db.user.findOne(
      { where: { identifier: transfer.senderIdentifier } }
    ).then(user =>
      user.update({
        balance: user.balance - transfer.balance
      })
    )
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize
db.Op = Op

module.exports = db
