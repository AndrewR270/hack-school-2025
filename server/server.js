const express = require('express');
const cors = require('cors');
const config = require('./config/server');
const router = require('./routes/router');
const mongoose = require('mongoose');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api', router);

mongoose
  .connect(config.DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB: ', err));

server.listen(config.PORT, () => {
  console.log('Server started listening on PORT ' + config.PORT);
});
