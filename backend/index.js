const express = require('express');
const cors = require('cors'); // CORS'u içe aktar
const sequelize = require('./config/database');
const albumRoutes = require('./routes/albumRoutes');
const artistRoutes = require('./routes/artistRoutes');

const app = express();

// CORS
app.use(cors());

app.use(express.json());

// Routes
app.use('/albums', albumRoutes);
app.use('/artists', artistRoutes);

// run server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ alter: true });
    app.listen(5000, () => console.log('Server is running on http://localhost:5000'));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
