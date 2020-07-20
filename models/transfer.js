'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
  };
  Transfer.init({
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
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
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'transfer'
  })
  return Transfer
}
