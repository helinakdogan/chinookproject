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

    if (!formData.title || !formData.artist) {
      setMessage("Album title and artist name are required.");
      return;
    }

    fetch("http://localhost:5000/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        artist: formData.artist,
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
    <div
      className="bg-violet-900 bg-opacity-15 shadow-lg rounded-xl p-8 max-w-lg mx-auto text-white mt-6"
      style={{
        backdropFilter: "blur(8px)", // Blur efekti ekledik
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)", // Derinlik eklendi
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
        {/* Album Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Album Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-violet-400 placeholder-gray-300"
            placeholder="Enter album title"
            required
          />
        </div>

        {/* Artist Name */}
        <div>
          <label htmlFor="artist" className="block text-sm font-medium mb-2">
            Artist Name
          </label>
          <input
            type="text"
            name="artist"
            id="artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full rounded-lg bg-violet-700 bg-opacity-20 text-white p-3 focus:border-violet-500 focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
            placeholder="Enter artist name"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 font-medium"
        >
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
