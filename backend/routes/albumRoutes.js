const express = require('express');
const { Album, Artist, Track } = require('../models'); // Modelleri import et
const router = express.Router();

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Get all albums
 *     description: Fetch all albums with optional pagination (limit and offset).
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of albums to fetch.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of albums to skip.
 *     responses:
 *       200:
 *         description: List of albums.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   album_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   artist_id:
 *                     type: integer
 *                   Artist:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *       400:
 *         description: Invalid query parameters.
 *       500:
 *         description: Error fetching albums.
 */
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50; // Default limit 50
    const offset = parseInt(req.query.offset, 10) || 0; // Default offset 0

    // Negatif değer kontrolü
    if (limit < 0 || offset < 0) {
      return res.status(400).json({ error: "Limit and offset must be non-negative numbers" });
    }

    const albums = await Album.findAll({
      include: {
        model: Artist,
        attributes: ["name"], // Sadece artist adı
      },
      attributes: ["album_id", "title", "artist_id"], // Sadece gerekli alanları al
      order: [["title", "ASC"]], // Alfabetik sıralama
      limit: limit, // Limit ekliyoruz
      offset: offset, // Offset ekliyoruz
    });

    res.json(albums); // Albümleri JSON olarak döndür
  } catch (error) {
    console.error("Error fetching albums:", error.message);
    res.status(500).json({ error: "Error fetching albums" });
  }
});

/**
 * @swagger
 * /albums/{albumId}:
 *   get:
 *     summary: Get details of a specific album
 *     description: Fetch details of an album by its ID, including tracks and artist information.
 *     parameters:
 *       - in: path
 *         name: albumId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the album to fetch.
 *     responses:
 *       200:
 *         description: Album details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 album_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 artist_id:
 *                   type: integer
 *                 Artist:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 Tracks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       track_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       milliseconds:
 *                         type: integer
 *                       unit_price:
 *                         type: number
 *                         format: float
 *       404:
 *         description: Album not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @swagger
 * /albums:
 *   post:
 *     summary: Add a new album
 *     description: Add a new album with a title and artist. If the artist does not exist, it will be created.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *     responses:
 *       201:
 *         description: Album added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 album:
 *                   type: object
 *                   properties:
 *                     album_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     artist_id:
 *                       type: integer
 *       400:
 *         description: Missing or invalid request body.
 *       500:
 *         description: Error adding album.
 */
router.post("/", async (req, res) => {
  const { title, artist } = req.body;

  // Eksik veri kontrolü
  if (!title || !artist) {
    return res.status(400).json({ error: "Both 'title' and 'artist' are required" });
  }

  try {
    // Sanatçıyı kontrol et veya ekle
    let artistInstance = await Artist.findOne({ where: { name: artist } });

    if (!artistInstance) {
      const maxArtistId = await Artist.max("artist_id") || 0; // Mevcut en yüksek artist_id'yi al
      const newArtistId = maxArtistId + 1; // Yeni artist_id oluştur
      artistInstance = await Artist.create({
        artist_id: newArtistId,
        name: artist,
      });
    }

    // Yeni albüm ID'si oluştur
    const maxAlbumId = await Album.max("album_id") || 0; // Mevcut en yüksek album_id'yi al
    const newAlbumId = maxAlbumId + 1; // Yeni album_id oluştur

    // Albümü ekle
    const album = await Album.create({
      album_id: newAlbumId, // Manuel olarak ID atıyoruz
      title,
      artist_id: artistInstance.artist_id,
    });

    res.status(201).json({ message: "Album added successfully!", album });
  } catch (error) {
    console.error("Error adding album:", error);
    res.status(500).json({ error: "Error adding album." });
  }
});

module.exports = router;
