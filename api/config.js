const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongodb: process.env.MONGODB_URL,
  port: process.env.PORT
};