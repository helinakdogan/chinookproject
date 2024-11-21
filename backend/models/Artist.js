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
      type: DataTypes.STRING(120), // VARCHAR(120)
      allowNull: true, // NULL olabilir
    },
  },
  {
    tableName: 'artist', // Tablo adını küçük harfli olarak ayarla
    timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırakır
    freezeTableName: true, // Sequelize'ın tablo adını değiştirmesini engeller
  }
);

module.exports = Artist;
