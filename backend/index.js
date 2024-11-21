const express = require('express');
const cors = require('cors'); // CORS'u içe aktar
const sequelize = require('./config/database');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');

const app = express();

// CORS'u etkinleştir
app.use(cors());

app.use(express.json());

// Rotalar
app.use('/albums', albumRoutes);
app.use('/tracks', trackRoutes);

// Veritabanını senkronize et ve sunucuyu başlat
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
