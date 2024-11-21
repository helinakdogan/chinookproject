import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/menu/Navbar";

import AlbumsPage from "./pages/AlbumsPage";
import TracksPage from "./pages/TracksPage";

const App = () => {
  const [currentSelect, setCurrentSelect] = useState("Albums");

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
      />

      {/* Main content */}
      <main className="container mx-auto p-4">
        {currentSelect === "Albums" && <AlbumsPage/>}
        {currentSelect === "Tracks" && <TracksPage />}
      </main>
    </div>
  );
};

export default App;
