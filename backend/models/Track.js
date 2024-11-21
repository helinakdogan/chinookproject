const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Track = sequelize.define('Track', {
  track_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  album_id: { type: DataTypes.INTEGER, allowNull: false },
  genre_id: { type: DataTypes.INTEGER },
  composer: { type: DataTypes.STRING },
  milliseconds: { type: DataTypes.INTEGER },
  unit_price: { type: DataTypes.FLOAT },
});

module.exports = Track;
