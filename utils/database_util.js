const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// database authentication
const db = new Sequelize({
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    logging: false
});

module.exports = { db, DataTypes };