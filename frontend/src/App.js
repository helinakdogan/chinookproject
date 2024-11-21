import React, { useEffect, useState } from 'react';

const App = () => {
  const [albums, setAlbums] = useState([]); // Albümleri tutan state
  const [artists, setArtists] = useState([]); // Artistleri tutan state

  // Albümleri getiren API çağrısı
  useEffect(() => {
    fetch('http://localhost:5000/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error('Hata:', error));
  }, []);

  // Artistleri getiren API çağrısı
  useEffect(() => {
    fetch('http://localhost:5000/artists')
      .then((response) => response.json())
      .then((data) => setArtists(data))
      .catch((error) => console.error('Hata:', error));
  }, []);

  return (
    <div>
      {/* Albümler Listesi */}
      <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.album_id}>
            <strong>{album.title}</strong> by {album.Artist?.name || 'Unknown Artist'}
          </li>
        ))}
      </ul>

      {/* Artistler Listesi */}
      <h1>Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.artist_id}>
            {artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
