const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // chinook
  process.env.DB_USER, // postgres
  process.env.DB_PASSWORD, // şifre
  {
    host: process.env.DB_HOST, // localhost
    dialect: 'postgres', // PostgreSQL 
  }
);

module.exports = sequelize;
