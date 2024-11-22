import React, { useEffect, useState } from "react";

const AlbumList = ({ selectAlbum }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div
            key={album.album_id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{album.title}</h2>
            <p className="text-gray-600">
              <strong>Artist:</strong> {album.Artist?.name || "Unknown Artist"}
            </p>
            <button
              onClick={() => selectAlbum(album.album_id)}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Albume Git
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
