const express = require("express");
const { Track, Album, Genre, MediaType } = require("../models"); // Modelleri import et
const router = express.Router();

// Tüm parçaları listeleme
// Tüm parçaları listeleme
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || null; // Limit parametresi
    const offset = parseInt(req.query.offset, 10) || 0; // Offset parametresi

    const { count: totalTracks, rows: tracks } = await Track.findAndCountAll({
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
      offset,
    });

    res.json({ tracks, totalTracks });
  } catch (error) {
    console.error("Hata:", error.message);
    res.status(500).json({ error: "Error fetching tracks" });
  }
});



// ID'ye göre bir parça getir
router.get("/:trackId", async (req, res) => {
  const { trackId } = req.params;

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
    console.error("Error fetching track details:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Yeni parça ekle
// Yeni parça ekle
router.post("/", async (req, res) => {
  console.log("Request Body:", req.body);
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

  try {
    // Süre formatını doğrula
    if (!/^\d+:\d{2}$/.test(duration)) {
      return res.status(400).json({ error: "Invalid duration format. Use MM:SS." });
    }

    // Süreyi millisecond'a çevir
    const [minutes, seconds] = duration.split(":").map(Number);
    const milliseconds = (minutes * 60 + seconds) * 1000;

    // Unit price doğrulama
    if (!unit_price || isNaN(unit_price) || unit_price <= 0) {
      return res.status(400).json({ error: "Invalid unit price." });
    }

    // Albümü kontrol et veya ekle
    let albumInstance = await Album.findOne({ where: { title: album } });

    if (!albumInstance) {
      const maxAlbumId = (await Album.max("album_id")) || 0; // Mevcut en yüksek album_id'yi al
      const newAlbumId = maxAlbumId + 1; // Yeni album_id oluştur
      albumInstance = await Album.create({
        album_id: newAlbumId,
        title: album,
        artist_id: 1, // Varsayılan bir artist_id eklenebilir.
      });
    }

    // MediaType'ı kontrol et
    const mediaTypeInstance = await MediaType.findOne({
      where: { media_type_id: mediaType },
    });
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

    // Yeni track ID'si oluştur
    const maxTrackId = (await Track.max("track_id")) || 0; // Mevcut en yüksek track_id'yi al
    const newTrackId = maxTrackId + 1; // Yeni track_id oluştur

    // Track ekle
    const track = await Track.create({
      track_id: newTrackId,
      name,
      album_id: albumInstance.album_id,
      media_type_id: mediaTypeInstance.media_type_id,
      genre_id: genreInstance ? genreInstance.genre_id : null,
      composer,
      milliseconds,
      bytes: bytes || null,
      unit_price: unit_price,
    });

    res.status(201).json({ message: "Track added successfully!", track });
  } catch (error) {
    console.error("Error adding track:", error);
    res.status(500).json({ error: "Error adding track." });
  }
});


module.exports = router;
