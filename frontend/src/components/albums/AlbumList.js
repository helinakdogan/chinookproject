import React, { useEffect, useState } from "react";

const AlbumList = ({ selectAlbum }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-8 text-center">🌟 Albums</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {albums.map((album) => (
          <div
            key={album.album_id}
            className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col items-center justify-center"
            style={{
              aspectRatio: "1",
              width: "100%",
              maxWidth: "300px", // Kutuları büyütmek için artırıldı
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.6)", // Daha belirgin gölge
            }}
          >
            {/* İkon */}
            <div className="absolute top-4 right-4 bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
              🎶
            </div>

            {/* Albüm Adı */}
            <h3
              className="text-lg font-bold text-center text-black mt-4 break-words"
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
                overflowWrap: "break-word",
              }}
            >
              {album.title}
            </h3>

            {/* Artist Adı */}
            <p className="text-center text-gray-700 text-md mt-4">
              <strong></strong> {album.Artist?.name || "Unknown Artist"}
            </p>

            {/* Albüm Detay Butonu */}
            <button
              onClick={() => selectAlbum(album.album_id)}
              className="mt-6 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-400 transition-all font-medium shadow-md hover:shadow-lg"
            >
              Go to Album
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
