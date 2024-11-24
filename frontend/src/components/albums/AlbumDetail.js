import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const AlbumDetail = ({ albumId, goBack }) => {
  const [albumDetails, setAlbumDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/albums/${albumId}`)
      .then((response) => response.json())
      .then((data) => setAlbumDetails(data))
      .catch((error) => console.error("Error fetching album details:", error));
  }, [albumId]);

  if (!albumDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-xl">Loading album details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white">
      {/* Geri Dön Butonu */}
      <div className="flex justify-start mb-6">
        <button
          onClick={goBack}
          className="px-6 py-2 bg-green-600 rounded-full hover:bg-green-500 shadow-md text-white font-medium transition-all"
        >
          <FaArrowLeft />
        </button>
      </div>

      {/* Albüm Başlığı */}
      <div className="mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-wide  text-center">
          {albumDetails.title}
        </h1>
      </div>

      {/* Albüm Detayları */}
      <div className="bg-gray-800 bg-opacity-40 rounded-lg shadow-lg p-6 mb-12 backdrop-blur-lg">
        <p className="text-lg text-center">
          <strong>Artist:</strong>{" "}
          {albumDetails.Artist?.name || "Unknown Artist"}
        </p>
      </div>

      {/* Parça Listesi */}
      <div className="bg-gray-800 bg-opacity-40 rounded-lg shadow-lg p-6 backdrop-blur-lg">
        <h2 className="text-3xl font-semibold mb-8 text-center">⭐ Tracks</h2>
        {albumDetails.Tracks?.length > 0 ? (
          <ul className="divide-y divide-purple-800">
            {albumDetails.Tracks.map((track) => (
              <li key={track.track_id} className="py-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  {/* Track Adı */}
                  <span className="text-lg font-bold text-white">
                    {track.name}
                  </span>
                  {/* Süre */}
                  <span className="text-sm text-gray-400 text-center">
                    {Math.floor(track.milliseconds / 60000)} mins{" "}
                    {Math.floor((track.milliseconds % 60000) / 1000)} secs
                  </span>
                  {/* Fiyat */}
                  <span className="text-lg text-right text-gray-300">
                    ${parseFloat(track.unit_price).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">No tracks available.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
