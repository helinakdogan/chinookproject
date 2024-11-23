import React, { useEffect, useState } from "react";
import {
  FaMusic,
  FaClock,
  FaDollarSign,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";

const TrackList = ({ viewTrackDetails }) => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre_id: "",
    minLength: "",
    maxLength: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tüm trackleri getir
    fetch("http://localhost:5000/tracks?limit=99999&offset=0")
      .then((response) => response.json())
      .then((data) => {
        const { tracks: allTracks } = data || {};
        setTracks(allTracks || []); // Gelen tüm veriyi kaydet
        setFilteredTracks(allTracks || []); // Filtrelenmiş listeye başlangıçta tümünü ata
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
        setIsLoading(false);
      });

    // Genre'leri getir
    fetch("http://localhost:5000/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data || [])) // Genre'leri kaydet
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const convertToMilliseconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60000 + (seconds || 0) * 1000;
  };

  const convertToMinutes = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const applyFilters = () => {
    const filtered = (tracks || []).filter((track) => {
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

    setFilteredTracks(filtered);
  };

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 via-black to-purple-900 text-white mt-1">
      <h1 className="text-4xl font-bold tracking-wide flex items-center justify-center gap-3">
        🌟 Tracks
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500 mt-40">Loading tracks...</p>
      ) : (
        <>
          {/* Filters */}
          <div className="bg-teal-800 bg-opacity-20 p-4 rounded-lg shadow-lg backdrop-blur-lg mb-10 mt-6">
            <div className="flex flex-wrap justify-center items-center gap-6">
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
              {[
                {
                  label: "Min Length (mm:ss):",
                  name: "minLength",
                  type: "text",
                },
                {
                  label: "Max Length (mm:ss):",
                  name: "maxLength",
                  type: "text",
                },
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
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-teal-700 rounded-full hover:bg-teal-600 shadow-md font-medium transition-all flex items-center gap-2"
              >
                <FaFilter /> Filter
              </button>
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-4">
            {(filteredTracks || []).map((track) => (
              <div
                key={track.track_id}
                className="bg-gray-800 bg-opacity-40 rounded-lg shadow-lg hover:shadow-xl p-6 grid grid-cols-5 items-center gap-4 transition-all"
              >
                {/* Track Icon and Name */}
                <div className="flex items-center col-span-2 gap-4">
                  <div className="bg-purple-700 w-12 h-12 flex items-center justify-center rounded-full text-white text-xl">
                    <FaMusic />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{track.name}</h2>
                  </div>
                </div>

                {/* Duration */}
                <div className="text-center text-gray-400 flex items-center gap-2 justify-center">
                  <FaClock />
                  {convertToMinutes(track.milliseconds)}
                </div>

                {/* Price */}
                <div className="text-right text-white font-bold flex items-center gap-2 justify-end">
                  <FaDollarSign />
                  {parseFloat(track.unit_price).toFixed(2)}
                </div>

                {/* Details Button */}
                <button
                  onClick={() => viewTrackDetails(track.track_id)}
                  className="py-2 bg-green-600 rounded-full hover:bg-green-500 shadow-md text-white flex items-center justify-center"
                  style={{ width: "100px", marginLeft: "auto" }}
                >
                  Details{" "}
                  <span className="ml-2">
                    <FaArrowRight />
                  </span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TrackList;
