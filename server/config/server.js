// import dotenv
const dotenv = require('dotenv');

dotenv.config();

// create config object witH PORT
const config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

module.exports = config;

DB_URL = 'mongodb+srv://andrewrafal12_db_user:Tullius_Cicero62BC@acm-hack-school-2025.musrb8g.mongodb.net/hack-school-2025?retryWrites=true&w=majority&appName=acm-hack-school-2025'

PORT = 3001