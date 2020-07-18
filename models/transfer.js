const User = require('./user')

module.exports = function (sequelize, Sequelize) {
  var Transfer = sequelize.define('transfer', {
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    balance: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    identifier: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    user_send: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'identifier'
      },
      allowNull: false
    },
    user_receive: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'identifier'
      },
      allowNull: false
    }
  })

  return Transfer
}
