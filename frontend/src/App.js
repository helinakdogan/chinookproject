import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/menu/Navbar";

import AlbumsPage from "./pages/AlbumsPage";
import TracksPage from "./pages/TracksPage";
import HomePage from "./pages/HomePage";
import AddContent from "./pages/AddContent";

const App = () => {
  const [currentSelect, setCurrentSelect] = useState("Home");

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
      />

      {/* Main content */}
      <main className="container mx-auto p-4">
        {currentSelect === "Home" && (
          <HomePage setCurrentSelect={setCurrentSelect} />
        )}
        {currentSelect === "Albums" && <AlbumsPage />}
        {currentSelect === "Tracks" && <TracksPage />}
        {currentSelect === "Add Content" && <AddContent />}
      </main>
    </div>
  );
};

export default App;
