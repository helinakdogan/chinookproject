import React, { useEffect, useState } from "react";
import { FaArrowRight, FaRecordVinyl } from "react-icons/fa";

const AlbumList = ({ selectAlbum }) => {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 52; 

  const fetchAlbums = async () => {
    setIsLoading(true);
    try {
      const offset = page * limit; 
      const response = await fetch(
        `http://localhost:5000/albums?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      if (data.length > 0) {
        // Yeni albümleri mevcut albümlere ekle
        setAlbums((prevAlbums) => {
          const newAlbums = data.filter(
            (album) => !prevAlbums.some((a) => a.album_id === album.album_id)
          );
          return [...prevAlbums, ...newAlbums];
        });

        
        if (data.length < limit) {
          setHasMore(false);
        }
      } else {
        setHasMore(false); // Hiç albüm gelmezse son sayfa
      }
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, [page]); 

  const loadMoreAlbums = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Sayfayı artır
    }
  };

  return (
    <div className="mt-6">
      <h1 className="text-4xl font-bold tracking-wide flex items-center justify-center gap-3">
        🌟 Albums
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mt-8">
        {albums.map((album) => (
          <div
            key={album.album_id}
            className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-500 p-8 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all flex flex-col items-center justify-center"
            style={{
              aspectRatio: "1",
              width: "100%",
              maxWidth: "300px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.6)",
            }}
          >
            <div className="absolute top-4 right-4 bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
              <FaRecordVinyl />
            </div>
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
            <p className="text-center text-gray-700 text-md mt-4">
              {album.Artist?.name || "Unknown Artist"}
            </p>
            <button
              onClick={() => selectAlbum(album.album_id)}
              className="mt-6 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-400 transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Go to Album <FaArrowRight />
            </button>
          </div>
        ))}
      </div>
      {hasMore && !isLoading && (
        <div className="text-center mt-8">
          <button
            onClick={loadMoreAlbums}
            className="px-6 py-3 bg-teal-600 rounded-full hover:bg-teal-500 text-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Load More Albums
          </button>
        </div>
      )}
      {isLoading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
};

export default AlbumList;
