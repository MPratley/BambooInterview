'use strict'
const bcrypt = require('bcrypt')
const { Model } = require('sequelize')

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
      beforeCreate: beforeUpdateOrCreate,
      beforeUpdate: beforeUpdateOrCreate
    }
  })
  return User
}
