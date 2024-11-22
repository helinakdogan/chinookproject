import React, { useEffect, useState } from "react";

const TrackDetail = ({ trackId, goBack }) => {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/tracks/${trackId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch track details");
        }
        return response.json();
      })
      .then((data) => {
        setTrack(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching track details:", error);
        setLoading(false);
      });
  }, [trackId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading track details...</p>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">Failed to load track details.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Başlık ve Geri Dön Butonu */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-800">{track.name}</h1>
        <button
          onClick={goBack}
          className="px-6 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600 transition focus:outline-none"
        >
          Geri Dön
        </button>
      </div>

      {/* Track Detayları */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Track Details</h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-600">
            <strong>Album:</strong>{" "}
            {track.Album?.title ? `${track.Album.title}` : "No Album"}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Genre:</strong>{" "}
            {track.Genre?.name || "Unknown Genre"}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Media Type:</strong>{" "}
            {track.MediaType?.name || "Unknown Media Type"}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Composer:</strong> {track.composer || "Unknown"}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Duration:</strong>{" "}
            {Math.floor(track.milliseconds / 60000)} mins{" "}
            {Math.floor((track.milliseconds % 60000) / 1000)} secs
          </p>
          <p className="text-lg text-gray-600">
            <strong>Size:</strong>{" "}
            {track.bytes ? `${(track.bytes / 1024 / 1024).toFixed(2)} MB` : "Unknown"}
          </p>
          <p className="text-lg text-gray-600">
            <strong>Price:</strong> ${parseFloat(track.unit_price).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
