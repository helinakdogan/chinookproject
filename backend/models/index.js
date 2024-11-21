const sequelize = require('../config/database');
const Album = require('./Album');
const Artist = require('./Artist');

// İlişkileri tanımla
Album.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Artist.hasMany(Album, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = {
  sequelize,
  Album,
  Artist,
};
