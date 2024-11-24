import React from "react";
import AddAlbum from "../components/albums/AddAlbum";
import AddTrack from "../components/tracks/AddTrack";
import { FaMusic, FaPlus } from "react-icons/fa";

const AddContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-purple-900 p-6 text-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-wide flex items-center justify-center gap-3">
          <FaMusic className="text-pink-600" /> Broaden Your Collection!
        </h1>
        <p className="text-lg mt-4 text-gray-300">
          Add albums and tracks to enrich your music library.
        </p>
      </div>

      {/* Content section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add Album */}
        <div className="bg-gray-800 bg-opacity-40 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <FaPlus /> Add New Album
          </h2>
          <AddAlbum />
        </div>

        {/* Add Track */}
        <div className="bg-gray-800 bg-opacity-40 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <FaPlus /> Add New Track
          </h2>
          <AddTrack />
        </div>
      </div>
    </div>
  );
};

export default AddContent;
