'use strict'
const { Model } = require('sequelize')
const User = require('./user')
module.exports = (sequelize, DataTypes) => {
  class transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  transfer.init({
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    balance: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    identifier: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_send: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'identifier'
      },
      allowNull: false
    },
    user_receive: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'identifier'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'transfer'
  })
  return transfer
}
