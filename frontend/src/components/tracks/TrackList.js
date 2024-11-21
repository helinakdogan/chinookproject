import React, { useEffect, useState } from "react";

const TrackList = () => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [filters, setFilters] = useState({
    genre_id: "",
    minLength: "",
    maxLength: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/tracks")
      .then((response) => response.json())
      .then((data) => {
        setTracks(data);
        setFilteredTracks(data);
      })
      .catch((error) => console.error("Error fetching tracks:", error));
  }, []);

  const applyFilters = () => {
    const filterTracks = () =>
      tracks.filter((track) => {
        const genreMatch = filters.genre_id
          ? track.genre_id === parseInt(filters.genre_id)
          : true;
        const minLengthMatch = filters.minLength
          ? track.milliseconds >= parseInt(filters.minLength)
          : true;
        const maxLengthMatch = filters.maxLength
          ? track.milliseconds <= parseInt(filters.maxLength)
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

    setFilteredTracks(filterTracks());
  };

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold text-center mb-6">Track List</h1>

      {/* Filters */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6 w-9/12 mx-auto">
        
        <div className="flex flex-wrap justify-center items-center gap-4">
          {[
            {
              label: "Genre ID:",
              name: "genre_id",
              type: "number",
              placeholder: "Genre ID",
            },
            {
              label: "Min Length (ms):",
              name: "minLength",
              type: "number",
              placeholder: "Min Length",
            },
            {
              label: "Max Length (ms):",
              name: "maxLength",
              type: "number",
              placeholder: "Max Length",
            },
            {
              label: "Min Price:",
              name: "minPrice",
              type: "number",
              step: "0.01",
              placeholder: "Min Price",
            },
            {
              label: "Max Price:",
              name: "maxPrice",
              type: "number",
              step: "0.01",
              placeholder: "Max Price",
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
            Filter Tracks
          </button>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-4 text-center">Tracks</h2>
      {/* Track List */}
      <div className="space-y-4">
        {filteredTracks.map((track) => (
          <div
            key={track.track_id}
            className="flex flex-col md:flex-row items-start bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex-1 ">
              <h2 className="text-xl font-semibold  text-gray-800 mb-2">
                {track.name}
              </h2>
              <p className="text-gray-600">
                <strong>Album:</strong> {track.Album?.title || "No Album"}
              </p>
              <p className="text-gray-600">
                <strong>Genre ID:</strong> {track.genre_id || "Unknown"}
              </p>
              <p className="text-gray-600">
                <strong>Price:</strong> $
                {parseFloat(track.unit_price).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList;
