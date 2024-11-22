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
    return <p>Loading album details...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">{albumDetails.title}</h1>
      <p className="text-lg">
        <strong>Artist:</strong> {albumDetails.Artist?.name || "Unknown Artist"}
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-4">Tracks</h2>
      <ul className="list-disc pl-5">
        {albumDetails.Tracks?.map((track) => (
          <li key={track.track_id}>
            <strong>{track.name}</strong> - {track.unit_price}$
          </li>
        )) || <p>No tracks available</p>}
      </ul>
      <button
        onClick={goBack}
        className="mt-6 px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none"
      >
        Geri Dön
      </button>
    </div>
  );
};

export default AlbumDetail;
