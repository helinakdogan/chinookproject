import React, { useEffect, useState } from "react";

const TrackList = ({ viewTrackDetails }) => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [genres, setGenres] = useState([]); // Genre listesi
  const [filters, setFilters] = useState({
    genre_id: "",
    minLength: "",
    maxLength: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Trackleri getir
    fetch("http://localhost:5000/tracks")
      .then((response) => response.json())
      .then((data) => {
        setTracks(data);
        setFilteredTracks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
        setIsLoading(false);
      });

    // Genre'leri getir
    fetch("http://localhost:5000/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data))
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
    const filtered = tracks.filter((track) => {
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
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Tracks</h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Trackler yükleniyor...</p>
      ) : (
        <>
          {/* Filters */}
          <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6 w-9/12 mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <div className="flex flex-col items-center w-1/6 min-w-[120px]">
                <label className="block text-sm font-medium text-gray-700 text-center">
                  Genre:
                </label>
                <select
                  name="genre_id"
                  value={filters.genre_id}
                  onChange={handleFilterChange}
                  className="w-full h-10 rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  placeholder: "e.g., 3:30",
                },
                {
                  label: "Max Length (mm:ss):",
                  name: "maxLength",
                  type: "text",
                  placeholder: "e.g., 4:20",
                },
                {
                  label: "Min Price ($):",
                  name: "minPrice",
                  type: "number",
                  step: "0.01",
                  placeholder: "e.g., 0.5",
                },
                {
                  label: "Max Price ($):",
                  name: "maxPrice",
                  type: "number",
                  step: "0.01",
                  placeholder: "e.g., 1",
                },
              ].map(({ label, name, ...props }) => (
                <div
                  key={name}
                  className="flex flex-col items-center w-1/6 min-w-[120px]"
                >
                  <label className="block text-sm font-medium text-gray-700 text-center">
                    {label}
                  </label>
                  <input
                    {...props}
                    name={name}
                    value={filters[name]}
                    onChange={handleFilterChange}
                    className="w-full h-10 rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
              <button
                onClick={applyFilters}
                className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 transition"
              >
                Filter
              </button>
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-4">
            {filteredTracks.map((track) => (
              <div
                key={track.track_id}
                className="flex flex-col md:flex-row items-start bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {track.name}
                  </h2>
                  <p className="text-gray-600">
                    <strong>Album:</strong> {track.Album?.title || "No Album"}
                  </p>
                  <p className="text-gray-600">
                    <strong>Genre:</strong> {track.Genre?.name || "Unknown"}
                  </p>

                  <p className="text-gray-600">
                    <strong>Duration:</strong>{" "}
                    {convertToMinutes(track.milliseconds)}
                  </p>
                  <p className="text-gray-600">
                    <strong>Price:</strong> $
                    {parseFloat(track.unit_price).toFixed(2)}
                  </p>

                  {/* Detayları Gör Butonu */}
                  <button
                    onClick={() => viewTrackDetails(track.track_id)}
                    className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Detayları Gör
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TrackList;
