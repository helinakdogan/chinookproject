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
          <AlbumList selectAlbum={(id) => setSelectedAlbumId(id)} />
          <h1>Add new album</h1>
          <AddAlbum />
        </>
      )}
    </div>
  );
};

export default AlbumsPage;
