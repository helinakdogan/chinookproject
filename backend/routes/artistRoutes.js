const express = require('express');
const { Artist } = require('../models'); // Artist modelini içe aktar
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll({
        attributes: ['artist_id', 'name'],
    }
        
    ); // Tüm artistleri getir
    res.json(artists); // JSON formatında döndür
  } catch (error) {
    console.error('Hata:', error.message); // Hata mesajını terminalde yazdır
    res.status(500).json({ error: 'Server Error' }); // Hata durumunda yanıt
  }
});

module.exports = router;
