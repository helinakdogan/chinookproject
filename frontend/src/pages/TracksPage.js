import React from 'react';
import TrackList from '../components/tracks/TrackList';
import AddTrack from '../components/tracks/AddTrack';

const TracksPage = () => {
  return (
    <div>
    
      <TrackList />
      <h1>Add Track</h1>
      <AddTrack />
    </div>
  );
};

export default TracksPage;
