const express = require('express');
const { Album, Artist, Track } = require('../models'); // Modelleri import et
const router = express.Router();

// Tüm albümleri listeleme
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || null;
    const albums = await Album.findAll({
      include: {
        model: Artist,
        attributes: ['name'], 
      },
      attributes: ['album_id', 'title', 'artist_id'], 
      order: [['title', 'ASC']],
      limit,
    });
    res.json(albums); // Albümleri JSON olarak döndür
  } catch (error) {
    console.error('Error fetching albums:', error.message);
    res.status(500).json({ error: 'Error fetching albums' });
  }
});

// Belirli bir albümü detaylarıyla listeleme
router.get('/:albumId', async (req, res) => {
  const { albumId } = req.params;
  try {
    const album = await Album.findByPk(albumId, {
      include: [
        {
          model: Artist,
          attributes: ['name'],
        },
        {
          model: Track,
          attributes: ['track_id', 'name', 'milliseconds', 'unit_price'],
        },
      ],
      attributes: ['album_id', 'title', 'artist_id'],
    });

    if (!album) {
      return res.status(404).json({ message: 'Album not found' });
    }

    res.json(album);
  } catch (error) {
    console.error('Error fetching album details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post("/", async (req, res) => {
  const { title, artist } = req.body;

  try {
      // Sanatçıyı kontrol et veya ekle
      let artistInstance = await Artist.findOne({ where: { name: artist } });

      if (!artistInstance) {
          const maxArtistId = await Artist.max("artist_id") || 0; // Mevcut en yüksek artist_id'yi al
          const newArtistId = maxArtistId + 1; // Yeni artist_id oluştur
          artistInstance = await Artist.create({
              artist_id: newArtistId,
              name: artist,
          });
      }

      // Yeni albüm ID'si oluştur
      const maxAlbumId = await Album.max("album_id") || 0; // Mevcut en yüksek album_id'yi al
      const newAlbumId = maxAlbumId + 1; // Yeni album_id oluştur

      // Albümü ekle
      const album = await Album.create({
          album_id: newAlbumId, // Manuel olarak ID atıyoruz
          title,
          artist_id: artistInstance.artist_id,
      });

      res.status(201).json({ message: "Album added successfully!", album });
  } catch (error) {
      console.error("Error adding album:", error);
      res.status(500).json({ error: "Error adding album." });
  }
});







module.exports = router;
