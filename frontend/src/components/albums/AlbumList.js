import React, { useEffect, useState } from 'react';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]); // Albümleri tutan state

  // Albümleri getiren API çağrısı
  useEffect(() => {
    fetch('http://localhost:5000/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data))
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
    </div>
  );
};

export default AlbumList;