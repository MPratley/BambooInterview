'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
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
    }
  }, {
    sequelize,
    modelName: 'user'
  })
  return User
}
