const express = require("express");
const { Track, Album, Genre, MediaType } = require("../models"); // Modelleri import et
const router = express.Router();

/**
 * @swagger
 * /tracks:
 *   get:
 *     summary: Get all tracks
 *     description: Fetch all tracks with optional limit for pagination.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: null
 *         description: Maximum number of tracks to fetch.
 *     responses:
 *       200:
 *         description: List of tracks.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   track_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   genre_id:
 *                     type: integer
 *                   milliseconds:
 *                     type: integer
 *                   unit_price:
 *                     type: number
 *                     format: float
 *                   Album:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                   Genre:
 *                     type: object
 *                     properties:
 *                       genre_id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       400:
 *         description: Invalid query parameter.
 *       500:
 *         description: Error fetching tracks.
 */
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;

    // Negatif değer kontrolü
    if (limit !== null && limit < 0) {
      return res.status(400).json({ error: "Limit must be a non-negative number." });
    }

    const tracks = await Track.findAll({
      include: [
        {
          model: Album,
          attributes: ["title"], // Albüm başlığını al
        },
        {
          model: Genre,
          attributes: ["genre_id", "name"], // Genre ismini al
        },
      ],
      attributes: [
        "track_id",
        "name",
        "genre_id",
        "milliseconds",
        "unit_price",
      ],
      limit,
    });
    res.json(tracks);
  } catch (error) {
    console.error("Error fetching tracks:", error.message);
    res.status(500).json({ error: "Error fetching tracks" });
  }
});

/**
 * @swagger
 * /tracks/{trackId}:
 *   get:
 *     summary: Get details of a specific track
 *     description: Fetch details of a track by its ID, including album, genre, and media type information.
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the track to fetch.
 *     responses:
 *       200:
 *         description: Track details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 track_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 album_id:
 *                   type: integer
 *                 genre_id:
 *                   type: integer
 *                 composer:
 *                   type: string
 *                 milliseconds:
 *                   type: integer
 *                 bytes:
 *                   type: integer
 *                 unit_price:
 *                   type: number
 *                   format: float
 *                 Album:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                 Genre:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 MediaType:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *       404:
 *         description: Track not found.
 *       500:
 *         description: Server error.
 */
router.get("/:trackId", async (req, res) => {
  const { trackId } = req.params;

  // ID doğrulama
  if (isNaN(trackId) || trackId <= 0) {
    return res.status(400).json({ error: "Invalid track ID." });
  }

  try {
    const track = await Track.findByPk(trackId, {
      include: [
        {
          model: Album,
          attributes: ["title"],
        },
        {
          model: Genre,
          attributes: ["name"], // Genre ismini al
        },
        {
          model: MediaType,
          attributes: ["name"], // MediaType ismini al
        },
      ],
      attributes: [
        "track_id",
        "name",
        "album_id",
        "genre_id",
        "composer",
        "milliseconds",
        "bytes",
        "unit_price",
      ],
    });

    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    res.json(track);
  } catch (error) {
    console.error("Error fetching track details:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @swagger
 * /tracks:
 *   post:
 *     summary: Add a new track
 *     description: Add a new track to the database. Album, media type, and genre are validated or created as needed.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               album:
 *                 type: string
 *               mediaType:
 *                 type: integer
 *               genre:
 *                 type: string
 *               composer:
 *                 type: string
 *               duration:
 *                 type: string
 *                 description: Duration in MM:SS format.
 *               bytes:
 *                 type: integer
 *               unit_price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Track added successfully.
 *       400:
 *         description: Missing or invalid data.
 *       500:
 *         description: Error adding track.
 */
router.post("/", async (req, res) => {
  const {
    name,
    album,
    mediaType,
    genre,
    composer,
    duration,
    bytes,
    unit_price,
  } = req.body;

  if (!name || !album || !mediaType || !duration || !unit_price) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Süre formatını doğrula
    if (!/^\d+:\d{2}$/.test(duration)) {
      return res.status(400).json({ error: "Invalid duration format. Use MM:SS." });
    }

    const [minutes, seconds] = duration.split(":").map(Number);
    const milliseconds = (minutes * 60 + seconds) * 1000;

    if (isNaN(unit_price) || unit_price <= 0) {
      return res.status(400).json({ error: "Invalid unit price." });
    }

    // Albümü kontrol et veya ekle
    let albumInstance = await Album.findOne({ where: { title: album } });
    if (!albumInstance) {
      const maxAlbumId = (await Album.max("album_id")) || 0;
      const newAlbumId = maxAlbumId + 1;
      albumInstance = await Album.create({
        album_id: newAlbumId,
        title: album,
        artist_id: 1,
      });
    }

    // MediaType'ı kontrol et
    const mediaTypeInstance = await MediaType.findOne({ where: { media_type_id: mediaType } });
    if (!mediaTypeInstance) {
      return res.status(400).json({ error: "Invalid media type." });
    }

    // Genre'yi kontrol et
    let genreInstance = null;
    if (genre) {
      genreInstance = await Genre.findOne({ where: { name: genre } });
      if (!genreInstance) {
        return res.status(400).json({ error: "Invalid genre." });
      }
    }

    const maxTrackId = (await Track.max("track_id")) || 0;
    const newTrackId = maxTrackId + 1;

    const track = await Track.create({
      track_id: newTrackId,
      name,
      album_id: albumInstance.album_id,
      media_type_id: mediaTypeInstance.media_type_id,
      genre_id: genreInstance ? genreInstance.genre_id : null,
      composer,
      milliseconds,
      bytes: bytes || null,
      unit_price,
    });

    res.status(201).json({ message: "Track added successfully!", track });
  } catch (error) {
    console.error("Error adding track:", error.message);
    res.status(500).json({ error: "Error adding track." });
  }
});

module.exports = router;
