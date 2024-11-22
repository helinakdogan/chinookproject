import React, { useEffect, useState } from "react";

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
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading album details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Albüm Başlığı ve Geri Dön Butonu */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">{albumDetails.title}</h1>
        <button
          onClick={goBack}
          className="px-6 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 transition focus:outline-none"
        >
          Geri Dön
        </button>
      </div>

      {/* Albüm Detayları */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
       
        <p className="text-lg text-gray-600 mb-2">
          <strong>Artist:</strong> {albumDetails.Artist?.name || "Unknown Artist"}
        </p>
        
      </div>

      {/* Parça Listesi */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Tracks</h2>
        {albumDetails.Tracks?.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {albumDetails.Tracks.map((track) => (
              <li key={track.track_id} className="py-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">{track.name}</span>
                  <span className="text-gray-600">${track.unit_price}</span>
                </div>
                <p className="text-sm text-gray-500">
                  <strong>Duration:</strong> {Math.floor(track.milliseconds / 60000)} mins{" "}
                  {Math.floor((track.milliseconds % 60000) / 1000)} secs
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No tracks available.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
