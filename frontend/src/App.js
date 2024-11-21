import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/menu/Navbar";
import AlbumList from "./components/albums/AlbumList";
import TrackList from "./components/tracks/TrackList";
import AddAlbum from "./components/albums/AddAlbum";
import AddTrack from "./components/tracks/AddTrack";
import TrackDetail from "./components/tracks/TrackDetail";

const App = () => {
  const [currentSelect, setCurrentSelect] = useState("Albums");
  const [selectedTrackId, setSelectedTrackId] = useState(null); // TrackDetail için state

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
      />

      {/* Main content */}
      <main className="container mx-auto p-4">
        {currentSelect === "Albums" && <AlbumList />}
        {currentSelect === "Tracks" && (
          <TrackList setSelectedTrackId={setSelectedTrackId} />
        )}
        {currentSelect === "Add Album" && <AddAlbum />}
        {currentSelect === "Add Track" && <AddTrack />}
        {currentSelect === "Track Details" && selectedTrackId && (
          <TrackDetail trackId={selectedTrackId} />
        )}
      </main>
    </div>
  );
};

export default App;
