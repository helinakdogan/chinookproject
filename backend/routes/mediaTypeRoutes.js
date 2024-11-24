const express = require('express');
const { MediaType } = require('../models'); // Doğru yoldan import edilmelidir
const router = express.Router();

/**
 * @swagger
 * /media-types:
 *   get:
 *     summary: Get all media types
 *     description: Fetch a list of all available media types with their IDs and names.
 *     responses:
 *       200:
 *         description: List of media types.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   media_type_id:
 *                     type: integer
 *                     description: Unique ID of the media type.
 *                   name:
 *                     type: string
 *                     description: Name of the media type.
 *       404:
 *         description: No media types found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No media types found.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error fetching media types.
 */
router.get('/', async (req, res) => {
  try {
    const mediaTypes = await MediaType.findAll({
      attributes: ['media_type_id', 'name'], // Sadece gerekli alanları al
    });

    if (!mediaTypes || mediaTypes.length === 0) {
      // Eğer media types yoksa 404 döndür
      return res.status(404).json({ error: 'No media types found.' });
    }

    res.json(mediaTypes);
  } catch (error) {
    console.error('Error fetching media types:', error.message);
    res.status(500).json({ error: 'Error fetching media types' });
  }
});

module.exports = router;
