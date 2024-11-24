const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const albumRoutes = require('./routes/albumRoutes');
const artistRoutes = require('./routes/artistRoutes');
const trackRoutes = require('./routes/trackRoutes'); // Track routes'u ekleyin
const genreRoutes = require('./routes/genreRoutes');
const mediaTypeRoutes = require('./routes/mediaTypeRoutes'); // MediaType routes'u ekleyin
const swaggerUi = require('swagger-ui-express'); // Swagger UI
const swaggerDocs = require('./config/swaggerConfig'); // Swagger config

const app = express();

app.use(cors());
app.use(express.json());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/albums', albumRoutes);
app.use('/artists', artistRoutes);
app.use('/tracks', trackRoutes); 
app.use('/genres', genreRoutes); 
app.use('/media-types', mediaTypeRoutes);

// Sunucuyu başlatma
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    app.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
      console.log('API Docs available at http://localhost:5000/api-docs'); // Swagger için bilgi
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
