import React, { useEffect, useState } from 'react';

const TrackDetail = ({ trackId }) => {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/tracks/${trackId}`)
      .then((response) => response.json())
      .then((data) => setTrack(data))
      .catch((error) => console.error('Hata:', error));
  }, [trackId]);

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Track Details</h1>
      <p><strong>Name:</strong> {track.name}</p>
      <p><strong>Album:</strong> {track.Album ? track.Album.title : 'No Album'}</p>
      <p><strong>Composer:</strong> {track.composer || 'Unknown'}</p>
      <p><strong>Duration:</strong> {track.milliseconds} ms</p>
      <p><strong>Price:</strong> ${track.unit_price}</p>
    </div>
  );
};

export default TrackDetail;
