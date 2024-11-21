import React from 'react';
import TrackList from '../components/tracks/TrackList';
import AddTrack from '../components/tracks/AddTrack';

const TracksPage = () => {
  return (
    <div>
      <h1>Tracks</h1>
      <TrackList />
      <h1>Add Track</h1>
      <AddTrack />
    </div>
  );
};

export default TracksPage;
