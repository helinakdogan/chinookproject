import React, { useState, useEffect } from "react";

const AddTrack = () => {
  const [mediaTypes, setMediaTypes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    albumName: "",
    mediaTypeId: "",
    genre: "",
    composer: "",
    duration: "",
    bytes: "",
    unitPrice: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Media types ve genres'ı API'den çek
    fetch("http://localhost:5000/media-types")
      .then((response) => response.json())
      .then((data) => setMediaTypes(data))
      .catch((error) => console.error("Error fetching media types:", error));

    fetch("http://localhost:5000/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form doğrulama
    if (
      !formData.name.trim() ||
      !formData.albumName.trim() ||
      !formData.mediaTypeId ||
      !formData.duration.trim() ||
      !formData.unitPrice.trim()
    ) {
      setMessage("Please fill out all required fields.");
      return;
    }

    // Süreyi milisaniyeye çevir
    const [minutes, seconds] = formData.duration.split(":").map(Number);
    if (
      isNaN(minutes) ||
      isNaN(seconds) ||
      seconds >= 60 ||
      minutes < 0 ||
      seconds < 0
    ) {
      setMessage("Invalid duration format. Use MM:SS.");
      return;
    }
    const milliseconds = (minutes * 60 + seconds) * 1000;

    // Unit price doğrulama
    const unitPrice = parseFloat(formData.unitPrice);
    if (isNaN(unitPrice) || unitPrice <= 0) {
      setMessage("Please provide a valid unit price greater than 0.");
      return;
    }

    // Track ekleme isteği
    fetch("http://localhost:5000/tracks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name.trim(),
        album: formData.albumName.trim(),
        mediaType: formData.mediaTypeId,
        genre: formData.genre || null,
        composer: formData.composer.trim() || null,
        duration: formData.duration,
        milliseconds,
        bytes: formData.bytes ? parseInt(formData.bytes, 10) : null,
        unit_price: unitPrice,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || "Failed to add track.");
          });
        }
        return response.json();
      })
      .then(() => {
        setMessage("Track added successfully!");
        setFormData({
          name: "",
          albumName: "",
          mediaTypeId: "",
          genre: "",
          composer: "",
          duration: "",
          bytes: "",
          unitPrice: "",
        });
      })
      .catch((error) => {
        console.error("Error adding track:", error);
        setMessage(error.message || "Error adding track.");
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Track</h2>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Track Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Album Name</label>
          <input
            type="text"
            name="albumName"
            value={formData.albumName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Media Type</label>
          <select
            name="mediaTypeId"
            value={formData.mediaTypeId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Media Type</option>
            {mediaTypes.map((type) => (
              <option key={type.media_type_id} value={type.media_type_id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.genre_id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Composer</label>
          <input
            type="text"
            name="composer"
            value={formData.composer}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Duration (MM:SS)</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3:30"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bytes</label>
          <input
            type="number"
            name="bytes"
            value={formData.bytes}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Unit Price</label>
          <input
            type="number"
            step="0.01"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Add Track
        </button>
      </form>
    </div>
  );
};

export default AddTrack;
