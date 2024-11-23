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

    // Validation
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

    const unitPrice = parseFloat(formData.unitPrice);
    if (isNaN(unitPrice) || unitPrice <= 0) {
      setMessage("Please provide a valid unit price greater than 0.");
      return;
    }

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
    <div
      className="bg-violet-900 bg-opacity-15 shadow-lg rounded-xl p-8 max-w-lg mx-auto text-white mt-6"
      style={{
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
      }}
    >
      
      {message && (
        <p
          className={`text-center mb-6 ${
            message.includes("Error") ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Track Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
            placeholder="Enter track name"
            required
          />
        </div>
        <div>
          <label htmlFor="albumName" className="block text-sm font-medium mb-2">
            Album Name
          </label>
          <input
            type="text"
            name="albumName"
            id="albumName"
            value={formData.albumName}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
            placeholder="Enter album name"
            required
          />
        </div>
        <div>
          <label htmlFor="mediaTypeId" className="block text-sm font-medium mb-2">
            Media Type
          </label>
          <select
            name="mediaTypeId"
            id="mediaTypeId"
            value={formData.mediaTypeId}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
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
        <div>
          <label htmlFor="genre" className="block text-sm font-medium mb-2">
            Genre
          </label>
          <select
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.genre_id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="composer" className="block text-sm font-medium mb-2">
            Composer
          </label>
          <input
            type="text"
            name="composer"
            id="composer"
            value={formData.composer}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
            placeholder="Enter composer"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium mb-2">
            Duration (MM:SS)
          </label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
            placeholder="Enter duration (MM:SS)"
            required
          />
        </div>
        <div>
          <label htmlFor="bytes" className="block text-sm font-medium mb-2">
            Bytes
          </label>
          <input
            type="number"
            name="bytes"
            id="bytes"
            value={formData.bytes}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
            placeholder="Enter file size in bytes"
          />
        </div>
        <div>
          <label htmlFor="unitPrice" className="block text-sm font-medium mb-2">
            Unit Price
          </label>
          <input
            type="number"
            step="0.01"
            name="unitPrice"
            id="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
            placeholder="Enter unit price"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 font-medium"
        >
          Add Track
        </button>
      </form>
    </div>
  );
};

export default AddTrack;