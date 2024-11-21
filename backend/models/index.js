const sequelize = require('../config/database'); 
const Album = require('./Album'); 
const Artist = require('./Artist'); 
const Track = require('./Track'); 

// Modeller arasında ilişki kurma
Artist.hasMany(Album, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Album.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

Album.hasMany(Track, { foreignKey: 'album_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
Track.belongsTo(Album, { foreignKey: 'album_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });

module.exports = {
  sequelize, 
  Album, 
  Artist,
  Track, 
};
