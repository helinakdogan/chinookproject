import React, { useState } from "react";
import TrackDetail from "../components/tracks/TrackDetail";
import TrackList from "../components/tracks/TrackList";
import AddTrack from "../components/tracks/AddTrack";

const TracksPage = () => {
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  // Track detaylarını gösteren fonksiyon
  const viewTrackDetails = (id) => {
    setSelectedTrackId(id);
  };

  return (
    <div>
      {selectedTrackId ? (
        <TrackDetail
          trackId={selectedTrackId}
          goBack={() => setSelectedTrackId(null)}
        />
      ) : (
        <>
        <AddTrack />
          <TrackList viewTrackDetails={viewTrackDetails} />
          
          
        </>
      )}
    </div>
  );
};

export default TracksPage;
