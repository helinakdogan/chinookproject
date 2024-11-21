import React, { useState } from 'react';

const AddTrack = () => {
  const [trackData, setTrackData] = useState({
    name: '',
    album_id: '',
    genre_id: '',
    composer: '',
    milliseconds: '',
    unit_price: '',
  });

  const handleChange = (e) => {
    setTrackData({ ...trackData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/tracks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Track added:', data);
        alert('Track added successfully!');
      })
      .catch((error) => console.error('Hata:', error));
  };

  return (
    <div>
      <h1>Add Track</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Track Name:</label>
          <input type="text" name="name" value={trackData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Album ID:</label>
          <input type="number" name="album_id" value={trackData.album_id} onChange={handleChange} />
        </div>
        <div>
          <label>Genre ID:</label>
          <input type="number" name="genre_id" value={trackData.genre_id} onChange={handleChange} />
        </div>
        <div>
          <label>Composer:</label>
          <input type="text" name="composer" value={trackData.composer} onChange={handleChange} />
        </div>
        <div>
          <label>Milliseconds:</label>
          <input
            type="number"
            name="milliseconds"
            value={trackData.milliseconds}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Unit Price:</label>
          <input
            type="number"
            name="unit_price"
            value={trackData.unit_price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Track</button>
      </form>
    </div>
  );
};

export default AddTrack;

