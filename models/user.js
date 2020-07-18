module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define('user', {
    identifier: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    nickname: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        isEmail: true
      }
    },
    balance: {
      type: Sequelize.BIGINT,
      allowNull: false
    }
  })

  return User
}
