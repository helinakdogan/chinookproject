import React, { useState } from "react";

const AddAlbum = () => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Boş alan kontrolü
    if (!formData.title || !formData.artist) {
      setMessage("Album title and artist name are required.");
      return;
    }

    // Albüm ekleme isteği
    fetch("http://localhost:5000/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title, // Albüm başlığı
        artist: formData.artist, // Sanatçı ismi
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add album");
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message || "Album added successfully!");
        setFormData({ title: "", artist: "" });
      })
      .catch((error) => {
        console.error("Error adding album:", error);
        setMessage("Error adding album.");
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Album</h2>
      {message && <p className={`text-center mb-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Album Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter album title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
            Artist Name
          </label>
          <input
            type="text"
            name="artist"
            id="artist"
            value={formData.artist}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter artist name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
