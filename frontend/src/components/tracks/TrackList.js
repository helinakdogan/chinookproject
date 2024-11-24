import React, { useEffect, useState } from "react";
import {
  FaMusic,
  FaClock,
  FaDollarSign,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";

const TrackList = ({ viewTrackDetails }) => {
  // Görüntülenen şarkılar
  const [tracks, setTracks] = useState([]);
  // Tüm şarkılar
  const [allTracks, setAllTracks] = useState([]);
  // Filtrelenmiş tüm şarkılar
  const [allFilteredTracks, setAllFilteredTracks] = useState([]);
  // Genre listesi
  const [genres, setGenres] = useState([]);
  // Filtreleme ayarları
  const [filters, setFilters] = useState({
    genre_id: "",
    minLength: "",
    maxLength: "",
    minPrice: "",
    maxPrice: "",
  });
  // Yükleme durumu
  const [isLoading, setIsLoading] = useState(true);
  // Load More durumu
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // Load More için başlangıç indeksi
  const [currentIndex, setCurrentIndex] = useState(20);

  // Şarkı ve genre verilerini yükle
  useEffect(() => {
    // İlk 20 şarkıyı çek
    fetch("http://localhost:5000/tracks?limit=20&offset=0")
      .then((response) => response.json())
      .then((data) => {
        setTracks(data || []); // Görüntülemek için ilk 20 şarkı
        setIsLoading(false); // Yükleme tamamlandı
      })
      .catch((error) => {
        console.error("Error fetching initial tracks:", error);
        setIsLoading(false); // Yükleme hatası
      });

    // Tüm şarkıları belleğe yükle
    fetch("http://localhost:5000/tracks?limit=99999&offset=0")
      .then((response) => response.json())
      .then((data) => {
        setAllTracks(data || []); // Belleğe tüm şarkıları kaydet
        setAllFilteredTracks(data || []); // Filtrelenmiş listeye tümünü ekle
      })
      .catch((error) => console.error("Error fetching all tracks:", error));

    // Genre verilerini yükle
    fetch("http://localhost:5000/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data || [])) // Genre listesi
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  // Filtreleme işlemini uygula
  const applyFilters = () => {
    const filtered = (allTracks || []).filter((track) => {
      // Filtre kriterlerini kontrol et
      const genreMatch = filters.genre_id
        ? track.genre_id === parseInt(filters.genre_id)
        : true;
      const minLengthMatch = filters.minLength
        ? track.milliseconds >= convertToMilliseconds(filters.minLength)
        : true;
      const maxLengthMatch = filters.maxLength
        ? track.milliseconds <= convertToMilliseconds(filters.maxLength)
        : true;
      const minPriceMatch = filters.minPrice
        ? track.unit_price >= parseFloat(filters.minPrice)
        : true;
      const maxPriceMatch = filters.maxPrice
        ? track.unit_price <= parseFloat(filters.maxPrice)
        : true;

      return (
        genreMatch &&
        minLengthMatch &&
        maxLengthMatch &&
        minPriceMatch &&
        maxPriceMatch
      );
    });

    setAllFilteredTracks(filtered); // Filtrelenmiş listeyi kaydet
    setTracks(filtered.slice(0, 20)); // İlk 20 sonucu göster
    setCurrentIndex(20); // Load More için başlangıç
  };

  // Load More işlevi
  const loadMoreTracks = () => {
    setIsLoadingMore(true); // Yükleme durumu güncelle
    const nextIndex = currentIndex + 20;

    // Yeni şarkıları ekle
    const additionalTracks = allFilteredTracks.slice(currentIndex, nextIndex);
    setTracks((prevTracks) => [...prevTracks, ...additionalTracks]);
    setCurrentIndex(nextIndex); // İndeksi güncelle
    setIsLoadingMore(false); // Yükleme tamamlandı
  };

  // Filtre değişikliklerini güncelle
  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  // Süreyi milisaniyeye çevir
  const convertToMilliseconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60000 + (seconds || 0) * 1000;
  };

  // Süreyi dakika:saniye formatına çevir
  const convertToMinutes = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-black to-purple-900 text-white mt-1">
      <h1 className="text-4xl font-bold tracking-wide flex items-center justify-center gap-3">
        🌟 Tracks
      </h1>

      {isLoading ? (
        // Şarkılar yüklenirken gösterilecek mesaj
        <p className="text-center text-gray-500 mt-40">Loading tracks...</p>
      ) : (
        <>
          {/* Filtreleme alanı */}
          <div className="bg-teal-800 bg-opacity-20 p-4 rounded-lg shadow-lg backdrop-blur-lg mb-10 mt-6">
            <div className="flex flex-wrap justify-center items-center gap-6">
              {/* Genre seçimi */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium mb-2">Genre</label>
                <select
                  name="genre_id"
                  value={filters.genre_id}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-purple-400"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre.genre_id} value={genre.genre_id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Diğer filtre alanları */}
              {[
                { label: "Min Length (mm:ss):", name: "minLength", type: "text" },
                { label: "Max Length (mm:ss):", name: "maxLength", type: "text" },
                { label: "Min Price ($):", name: "minPrice", type: "number" },
                { label: "Max Price ($):", name: "maxPrice", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex flex-col items-center">
                  <label className="text-sm font-medium mb-2">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={filters[name]}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:ring-purple-400"
                  />
                </div>
              ))}
              {/* Filtrele butonu */}
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-teal-700 rounded-full hover:bg-teal-600 shadow-md font-medium transition-all flex items-center gap-2"
              >
                <FaFilter /> Filter
              </button>
            </div>
          </div>

          {/* Şarkı listesi */}
          <div className="space-y-4">
            {tracks.map((track) => (
              <div
                key={track.track_id}
                className="bg-gray-800 bg-opacity-40 rounded-lg shadow-lg hover:shadow-xl p-6 grid grid-cols-5 items-center gap-4 transition-all"
              >
                {/* Şarkı adı */}
                <div className="flex items-center col-span-2 gap-4">
                  <div className="bg-purple-700 w-12 h-12 flex items-center justify-center rounded-full text-white text-xl">
                    <FaMusic />
                  </div>
                  <h2 className="text-xl font-bold">{track.name}</h2>
                </div>
                {/* Şarkı süresi */}
                <div className="text-center text-gray-400 flex items-center gap-2 justify-center">
                  <FaClock />
                  {convertToMinutes(track.milliseconds)}
                </div>
                {/* Şarkı fiyatı */}
                <div className="text-right text-white font-bold flex items-center gap-2 justify-end">
                  <FaDollarSign />
                  {parseFloat(track.unit_price).toFixed(2)}
                </div>
                {/* Detaylar butonu */}
                <button
                  onClick={() => viewTrackDetails(track.track_id)}
                  className="py-2 bg-green-600 rounded-full hover:bg-green-500 shadow-md text-white flex items-center justify-center"
                  style={{ width: "100px", marginLeft: "auto" }}
                >
                  Details {" "} <FaArrowRight />
                </button>
              </div>
            ))}
          </div>

          {/* Load More butonu */}
          {currentIndex < allFilteredTracks.length && (
            <div className="text-center mt-6">
              <button
                onClick={loadMoreTracks}
                className="px-6 py-3 bg-teal-600 rounded-full hover:bg-teal-500 text-lg font-medium shadow-md hover:shadow-lg transition-all"
                disabled={isLoadingMore}
              >
                {isLoadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrackList;
