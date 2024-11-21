const express = require('express');
const Track = require('../models/Track');
const Album = require('../models/Album');
const router = express.Router();

// Tüm parçaları listeleme
router.get('/', async (req, res) => {
  const tracks = await Track.findAll({ include: Album });
  res.json(tracks);
});

// Parça ekleme
router.post('/', async (req, res) => {
  const { name, album_id, genre_id, composer, milliseconds, unit_price } = req.body;
  const track = await Track.create({ name, album_id, genre_id, composer, milliseconds, unit_price });
  res.json(track);
});

module.exports = router;
