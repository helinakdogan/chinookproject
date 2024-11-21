const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Artist = require('./Artist'); // Artist modelini import et

const Album = sequelize.define(
  'Album',
  {
    album_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(160), // VARCHAR(160)
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'album', // Tablo adını küçük harfli olarak ayarlayın
    timestamps: false, // createdAt ve updatedAt sütunlarını devre dışı bırakır
    freezeTableName: true, // Sequelize'ın tablo adını değiştirmesini engeller
  }
);

// İlişki tanımlamaları
Album.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Artist.hasMany(Album, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Album;


