const express = require('express');
const { Artist } = require('../models'); // Artist modelini içe aktar
const router = express.Router();

/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Get all artists
 *     description: Fetch a list of all artists with their IDs and names.
 *     responses:
 *       200:
 *         description: List of artists.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   artist_id:
 *                     type: integer
 *                     description: Unique ID of the artist.
 *                   name:
 *                     type: string
 *                     description: Name of the artist.
 *       500:
 *         description: Server error.
 */
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll({
      attributes: ['artist_id', 'name'],
    });

    if (!artists || artists.length === 0) {
      // Eğer sanatçı yoksa 404 döner
      return res.status(404).json({ error: 'No artists found.' });
    }

    res.json(artists); // JSON formatında döndür
  } catch (error) {
    console.error('Error fetching artists:', error.message); // Hata mesajını terminalde yazdır
    res.status(500).json({ error: 'Server Error' }); // Hata durumunda yanıt
  }
});

module.exports = router;
