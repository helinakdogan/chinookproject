const express = require('express');
const { MediaType } = require('../models'); // Doğru yoldan import edilmelidir
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const mediaTypes = await MediaType.findAll({ attributes: ['media_type_id', 'name'] });
    res.json(mediaTypes);
  } catch (error) {
    console.error('Error fetching media types:', error);
    res.status(500).json({ error: 'Error fetching media types' });
  }
});

module.exports = router;
