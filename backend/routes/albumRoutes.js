const express = require('express');
const { Album, Artist, Track } = require('../models'); // Modelleri import et
const router = express.Router();

// Tüm albümleri listeleme
router.get('/', async (req, res) => {
  try {
    const albums = await Album.findAll({
      include: {
        model: Artist,
        attributes: ['name'], // Sanatçının sadece adını alın
      },
      attributes: ['album_id', 'title', 'artist_id'], // Albümde sadece gerekli sütunları al
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

module.exports = router;
