// import React, { useEffect, useState } from 'react';

// const App = () => {
//   const [albums, setAlbums] = useState([]); // Albümleri tutan state
//   const [artists, setArtists] = useState([]); // Artistleri tutan state

//   // Albümleri getiren API çağrısı
//   useEffect(() => {
//     fetch('http://localhost:5000/albums')
//       .then((response) => response.json())
//       .then((data) => setAlbums(data))
//       .catch((error) => console.error('Hata:', error));
//   }, []);

//   // Artistleri getiren API çağrısı
//   useEffect(() => {
//     fetch('http://localhost:5000/artists')
//       .then((response) => response.json())
//       .then((data) => setArtists(data))
//       .catch((error) => console.error('Hata:', error));
//   }, []);

//   return (
//     <div>
//       {/* Albümler Listesi */}
//       <h1>Albums</h1>
//       <ul>
//         {albums.map((album) => (
//           <li key={album.album_id}>
//             <strong>{album.title}</strong> by {album.Artist?.name || 'Unknown Artist'}
//           </li>
//         ))}
//       </ul>

//       {/* Artistler Listesi */}
//       <h1>Artists</h1>
//       <ul>
//         {artists.map((artist) => (
//           <li key={artist.artist_id}>
//             {artist.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AlbumList from './components/albums/AlbumList';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <h1>Test: React Router Çalışıyor Mu?</h1>
//         <Routes>
//           <Route path="/albums" element={<AlbumList />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/menu/Navbar";
import AlbumList from "./components/albums/AlbumList";
import TrackList from "./components/tracks/TrackList";
import AddAlbum from "./components/albums/AddAlbum";
import AddTrack from "./components/tracks/AddTrack";

const App = () => {
  const [currentSelect, setCurrentSelect] = useState("Albums");

  return (
    <div className="App">
      <Navbar
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
      />
      <main className="container mx-auto p-4">
        {currentSelect === "Albums" && <AlbumList />}
        {currentSelect === "Tracks" && <TrackList />}
        {currentSelect === "Add Album" && <AddAlbum />}
        {currentSelect === "Add Track" && <AddTrack />}
      </main>
    </div>
  );
};

export default App;
