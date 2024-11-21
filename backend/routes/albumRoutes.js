const express = require('express');
const { Album, Artist } = require('../models'); // Modelleri import et
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: {
        model: Artist,
        attributes: ['name'], // Sadece sanatçı ismini al
      },
      attributes: ['album_id', 'title', 'artist_id'], // Albümde sadece gerekli sütunları al
    });
    res.json(albums); // JSON formatında döndür
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ error: 'Error fetching albums' });
  }
});

module.exports = router;
