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

db.sequelize = sequelize
db.Sequelize = Sequelize
db.Op = Op

module.exports = db
