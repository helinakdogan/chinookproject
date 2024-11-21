import React, { useEffect, useState } from 'react';

const TrackList = () => {
  const [tracks, setTracks] = useState([]); // Parçaları tutan state

  // Parçaları getiren API çağrısı
  useEffect(() => {
    fetch('http://localhost:5000/tracks')
      .then((response) => response.json())
      .then((data) => setTracks(data))
      .catch((error) => console.error('Hata:', error));
  }, []);

  return (
    <div>
      {/* Parça Listesi */}
      <h1>Tracks</h1>
      <ul>
        {tracks.map((track) => (
          <li key={track.track_id}>
            <strong>{track.name}</strong>
            {track.Album ? ` from album: ${track.Album.title}` : ' (No Album)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
