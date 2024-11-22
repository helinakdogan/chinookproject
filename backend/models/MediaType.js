const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MediaType = sequelize.define(
  'MediaType',
  {
    media_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  },
  {
    tableName: 'media_type',
    timestamps: false,
  }
);

module.exports = MediaType;
