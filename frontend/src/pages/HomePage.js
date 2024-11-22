import React, { useEffect, useState } from "react";

const HomePage = ({ setCurrentSelect }) => {
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  // Albümleri ve şarkıları yükleme
  useEffect(() => {
    // Albümleri yükle
    fetch("http://localhost:5000/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data.slice(0, 4))) // İlk 4 albümü göster
      .catch((error) => console.error("Error fetching albums:", error));

    // Şarkıları yükle
    fetch("http://localhost:5000/tracks")
      .then((response) => response.json())
      .then((data) => setTracks(data.slice(0, 4))) // İlk 4 şarkıyı göster
      .catch((error) => console.error("Error fetching tracks:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Music Library</h1>
      <p className="text-lg text-center mb-8">
        Browse tracks and albums, or add new ones to the collection!
      </p>

      {/* Albümler */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Featured Albums</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {albums.map((album) => (
            <div
              key={album.album_id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{album.title}</h3>
              <p className="text-gray-600">
                <strong>Artist:</strong> {album.Artist?.name || "Unknown Artist"}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setCurrentSelect("Albums")}
          className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          See All Albums
        </button>
      </div>

      {/* Şarkılar */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Featured Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track) => (
            <div
              key={track.track_id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{track.name}</h3>
              <p className="text-gray-600">
                <strong>Album:</strong> {track.Album?.title || "No Album"}
              </p>
              <p className="text-gray-600">
                <strong>Price:</strong> ${track.unit_price}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setCurrentSelect("Tracks")}
          className="mt-4 px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          See All Tracks
        </button>
      </div>
    </div>
  );
};

export default HomePage;
