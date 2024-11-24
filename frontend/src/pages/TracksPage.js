import React, { useState } from "react";
import TrackDetail from "../components/tracks/TrackDetail";
import TrackList from "../components/tracks/TrackList";

const TracksPage = () => {
  const [selectedTrackId, setSelectedTrackId] = useState(null);

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
          <TrackList viewTrackDetails={viewTrackDetails} />
        </>
      )}
    </div>
  );
};

export default TracksPage;
