const sequelize = require('../config/database'); // Veritabanı bağlantısı
const Album = require('./Album'); // Album modelini import et
const Artist = require('./Artist'); // Artist modelini import et

// Modeller arasında ilişki kurma
Artist.hasMany(Album, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Album.belongsTo(Artist, { foreignKey: 'artist_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = {
  sequelize, // Veritabanı bağlantısını dışa aktar
  Album, // Album modelini dışa aktar
  Artist, // Artist modelini dışa aktar
};
