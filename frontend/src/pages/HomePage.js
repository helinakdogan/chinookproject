import React, { useEffect, useState } from "react";
import { FaMusic, FaRecordVinyl } from "react-icons/fa";

const HomePage = ({ setCurrentSelect }) => {
  // Albümler ve şarkılar için state'leri tanımla
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  // Albüm ve şarkı verilerini yüklemek için useEffect
  useEffect(() => {
    // Albümleri API'den çek
    fetch("http://localhost:5000/albums?limit=4&offset=0")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.tracks || data.slice(0, 4)); // İlk 4 albümü al
      })
      .catch((error) => console.error("Error fetching albums:", error));

    // Şarkıları API'den çek
    fetch("http://localhost:5000/tracks?limit=6&offset=0")
      .then((response) => response.json())
      .then((data) => {
        setTracks(data); // Tüm şarkıları state'e ata
      })
      .catch((error) => console.error("Error fetching tracks:", error));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-black to-purple-900 text-white">
      {/* Başlık */}
      <h1 className="text-5xl font-bold text-center mb-8 tracking-wide">
        <FaMusic className="inline-block text-pink-600 mr-2" /> Welcome to Music
        Library <FaMusic className="inline-block text-pink-600 ml-2" />
      </h1>
      <p className="text-lg text-center mb-20">
        Discover amazing tracks and albums, or add new ones to your collection!
      </p>

      {/* Albümler */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          🌟 Featured Albums
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {/* Albümleri listele */}
          {albums.map((album) => (
            <div
              key={album.album_id}
              className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all flex flex-col items-center justify-center"
              style={{
                aspectRatio: "1",
                width: "100%",
                maxWidth: "300px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="absolute top-4 right-4 bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                <FaRecordVinyl />
              </div>
              <h3
                className="text-xl font-bold text-center text-black mt-4 break-words"
                style={{
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                  overflowWrap: "break-word",
                }}
              >
                {album.title}
              </h3>
              <p
                className="text-center text-gray-700 text-sm mt-4"
                title={album.Artist?.name || "Unknown Artist"}
              >
                {album.Artist?.name || "Unknown Artist"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-8 mb-20">
        {/* Tüm albümleri görme butonu */}
        <button
          onClick={() => setCurrentSelect("Albums")}
          className="px-6 py-3 bg-green-600 rounded-full hover:bg-green-500 text-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          See All Albums
        </button>
      </div>

      {/* Tracks */}
      <div>
        <h2 className="text-3xl font-semibold mb-6">🌟 Featured Tracks</h2>
        <div className="space-y-4">
          {/* List tracks */}
          {tracks.map((track) => (
            <div
              key={track.track_id}
              className="grid grid-cols-3 items-center bg-gray-800 bg-opacity-80 rounded-xl p-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold text-white mr-4">
                  <FaMusic />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{track.name}</h3>
                </div>
              </div>
              <div className="text-gray-300 text-center">
                {track.Album?.title || "No Album"}
              </div>
              <div className="text-gray-300 text-right">
                ${parseFloat(track.unit_price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          {/* Load all tracks button */}
          <button
            onClick={() => setCurrentSelect("Tracks")}
            className="px-6 py-3 bg-green-600 rounded-full hover:bg-green-500 text-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            See All Tracks
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
