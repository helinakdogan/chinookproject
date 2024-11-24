const express = require('express');
const { Genre } = require('../models');

const router = express.Router();

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get all genres
 *     description: Fetch a list of all music genres with their IDs and names.
 *     responses:
 *       200:
 *         description: List of genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   genre_id:
 *                     type: integer
 *                     description: Unique ID of the genre.
 *                   name:
 *                     type: string
 *                     description: Name of the genre.
 *       404:
 *         description: No genres found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No genres found.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error.
 */
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll({
      attributes: ['genre_id', 'name'], // Genre ID ve isimleri al
    });

    if (!genres || genres.length === 0) {
      // Eğer hiç genre yoksa 404 döndür
      return res.status(404).json({ error: 'No genres found.' });
    }

    res.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
