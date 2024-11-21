import React, { useEffect, useState } from 'react';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]); // Albümleri tutan state
  const [selectedAlbumId, setSelectedAlbumId] = useState(null); // Seçilen albüm ID'sini tutan state

  // Albümleri getiren API çağrısı
  useEffect(() => {
    fetch('http://localhost:5000/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error('Hata:', error));
  }, []);

  // Albüm detayını açıp kapatma fonksiyonu
  const toggleAlbumDetails = (albumId) => {
    setSelectedAlbumId(selectedAlbumId === albumId ? null : albumId);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div
            key={album.album_id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            {/* Albüm Bilgisi */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{album.title}</h2>
            <p className="text-gray-600">
              <strong>Artist:</strong> {album.Artist?.name || 'Unknown Artist'}
            </p>

            {/* Detayları Gör Butonu */}
            <button
              onClick={() => toggleAlbumDetails(album.album_id)}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {selectedAlbumId === album.album_id ? 'Detayları Gizle' : 'Detayları Gör'}
            </button>

            {/* Albüm Detayları */}
            {selectedAlbumId === album.album_id && (
              <div className="mt-4 bg-gray-100 rounded-md p-3">
                <h3 className="text-lg font-semibold text-gray-700">Details</h3>
                <p>
                  <strong>Album ID:</strong> {album.album_id}
                </p>
                <p>
                  <strong>Artist:</strong> {album.Artist?.name || 'Unknown Artist'}
                </p>
                <p>
                  <strong>Tracks:</strong> {/* Buraya gerçek track bilgileri eklenebilir */}
                  <ul className="list-disc pl-5">
                    <li>Track 1</li>
                    <li>Track 2</li>
                    <li>Track 3</li>
                  </ul>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
