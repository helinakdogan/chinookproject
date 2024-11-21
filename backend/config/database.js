const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // chinook
  process.env.DB_USER, // postgres
  process.env.DB_PASSWORD, // şifreniz
  {
    host: process.env.DB_HOST, // localhost
    dialect: 'postgres', // PostgreSQL kullanıyoruz
  }
);

module.exports = sequelize;
