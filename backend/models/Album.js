const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Artist = require('./Artist');

const Album = sequelize.define(
  'Album',
  {
    album_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'album',
    timestamps: false,
    freezeTableName: true,
  }
);

Album.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Artist.hasMany(Album, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Album;
