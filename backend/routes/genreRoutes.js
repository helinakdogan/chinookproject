const express = require('express');
const { Genre } = require('../models');

const router = express.Router();

// Tüm genre'ları listeleme
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll({
      attributes: ['genre_id', 'name'], // Genre ID ve isimleri al
    });
    res.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
