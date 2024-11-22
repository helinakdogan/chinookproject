const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artist = sequelize.define(
  'Artist',
  {
    artist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: true, // Sanatçı ismi boş olabilir
    },
  },
  {
    tableName: 'artist',
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Artist;
