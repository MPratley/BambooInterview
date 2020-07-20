'use strict'
const bcrypt = require('bcrypt')
const { Model } = require('sequelize')
const transfer = require('./transfer')

const beforeUpdateOrCreate = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10), null)
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePassword (plainPass) {
      return bcrypt.compare(plainPass, this.password)
    }

    displayName () {
      if (this.nickname) return this.nickname
      return this.fullName
    }

    async getBalance () {
      const transfers = await this.getTransfers()
      console.log(transfers)
      var balance = 0
      transfers.forEach(t => {
        if (t.receiverIdentifier === this.identifier) {
          balance = balance + t.balance
        } else {
          balance = balance - t.balance
        }
      })
      return balance
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
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        len: {
          args: [7, 120],
          msg: 'The password length should be between 7 and 120 characters.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: beforeUpdateOrCreate,
      beforeUpdate: beforeUpdateOrCreate
    }
  })
  return User
}
