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
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-xl">Loading track details...</p>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p className="text-xl text-red-500">Failed to load track details.</p>
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
          Go Back to Tracks
        </button>
      </div>

      {/* Şarkı Başlığı */}
      <div className="mb-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-wide text-center">
          {track.name}
        </h1>
      </div>

      {/* Şarkı Detayları */}
      <div className="bg-gray-800 bg-opacity-40 rounded-lg shadow-lg p-6 mb-12 backdrop-blur-lg">
        <div className="space-y-4 text-lg">
          <p>
            <strong>Album:</strong>{" "}
            {track.Album?.title ? `${track.Album.title}` : "No Album"}
          </p>
          <p>
            <strong>Genre:</strong> {track.Genre?.name || "Unknown Genre"}
          </p>
          <p>
            <strong>Media Type:</strong>{" "}
            {track.MediaType?.name || "Unknown Media Type"}
          </p>
          <p>
            <strong>Composer:</strong> {track.composer || "Unknown"}
          </p>
          <p>
            <strong>Duration:</strong>{" "}
            {Math.floor(track.milliseconds / 60000)} mins{" "}
            {Math.floor((track.milliseconds % 60000) / 1000)} secs
          </p>
          <p>
            <strong>Size:</strong>{" "}
            {track.bytes
              ? `${(track.bytes / 1024 / 1024).toFixed(2)} MB`
              : "Unknown"}
          </p>
          <p>
            <strong>Price:</strong> ${parseFloat(track.unit_price).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackDetail;
