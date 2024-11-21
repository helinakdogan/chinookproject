import React from 'react';
import AlbumList from '../components/albums/AlbumList';
import AddAlbum from '../components/albums/AddAlbum';

const AlbumsPage = () => {
  return (
    <div>
      <h1>Albums</h1>
      <AlbumList />
      <h1>Add new album</h1>
      <AddAlbum />
    </div>
  );
};

export default AlbumsPage;
