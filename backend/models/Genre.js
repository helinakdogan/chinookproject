const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genre = sequelize.define(
    'Genre',
    {
      genre_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
    },
    {
      tableName: 'genre',
      timestamps: false,
      freezeTableName: true,
    }
  );
  
  module.exports = Genre;
  