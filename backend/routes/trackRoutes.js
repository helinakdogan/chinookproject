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

router.get('/:trackId', async (req, res) => {
  const { trackId } = req.params;

  try {
    console.log(`Fetching track with ID: ${trackId}`);

    const track = await Track.findByPk(trackId, {
      include: {
        model: Album,
        attributes: ['title'], // Albüm başlığını al
      },
      attributes: [
        'track_id',
        'name',
        'album_id',
        'composer',
        'milliseconds',
        'unit_price',
      ],
    });

    if (!track) {
      console.log(`Track with ID ${trackId} not found.`);
      return res.status(404).json({ message: 'Track not found' });
    }

    console.log(`Track data: ${JSON.stringify(track, null, 2)}`);
    res.json(track);
  } catch (error) {
    console.error('Error fetching track details:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;

