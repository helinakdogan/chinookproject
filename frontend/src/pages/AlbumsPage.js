import React, { useState } from "react";
import AlbumList from "../components/albums/AlbumList";
import AddAlbum from "../components/albums/AddAlbum";
import AlbumDetail from "../components/albums/AlbumDetail";

const AlbumsPage = () => {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  return (
    <div>
      {selectedAlbumId ? (
        <AlbumDetail albumId={selectedAlbumId} goBack={() => setSelectedAlbumId(null)} />
      ) : (
        <>
        <AddAlbum />
          <AlbumList selectAlbum={(id) => setSelectedAlbumId(id)} />
         
          
        </>
      )}
    </div>
  );
};

export default AlbumsPage;
