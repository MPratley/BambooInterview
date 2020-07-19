'use strict'
const bcrypt = require('bcrypt')
const { Model } = require('sequelize')

const hashNewPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10), null)
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
    }

    async comparePassword (plainPass) {
      return await bcrypt.compare(plainPass, this.password)
    }
  };
  User.init({
    identifier: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        isEmail: true
      }
    },
    balance: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    }
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: hashNewPassword,
      beforeUpdate: hashNewPassword
    }
  })
  return User
}
