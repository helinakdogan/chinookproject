const express = require('express');
const { Track, Album } = require('../models'); // Modelleri import et
const router = express.Router();

// Tüm parçaları listeleme
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.findAll({
      include: {
        model: Album,
        attributes: ['title'], // Albüm başlığını al
      },
      attributes: ['track_id', 'name', 'album_id', 'genre_id', 'composer', 'milliseconds', 'unit_price'], // Gerekli sütunları seç
    });
    res.json(tracks);
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ error: 'Error fetching tracks' });
  }
});

// Yeni bir parça ekleme
router.post('/', async (req, res) => {
  try {
    const { name, album_id, genre_id, composer, milliseconds, unit_price } = req.body;
    const track = await Track.create({ name, album_id, genre_id, composer, milliseconds, unit_price });
    res.json(track);
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ error: 'Error creating track' });
  }
});

module.exports = router;
