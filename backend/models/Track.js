const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Album = require('./Album');

const Track = sequelize.define(
  'Track',
  {
    track_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Albüm ID boş olabilir
    },
    media_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Genre ID boş olabilir
    },
    composer: {
      type: DataTypes.STRING(220),
      allowNull: true, // Besteci bilgisi boş olabilir
    },
    milliseconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bytes: {
      type: DataTypes.INTEGER,
      allowNull: true, // Dosya boyutu boş olabilir
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'track', // Veritabanındaki tablo adı
    timestamps: false, // createdAt ve updatedAt kullanılmıyor
    freezeTableName: true, // Tablo adını olduğu gibi korur
  }
);

// İlişki tanımlamaları
Track.belongsTo(Album, { foreignKey: 'album_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Album.hasMany(Track, { foreignKey: 'album_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

module.exports = Track;
