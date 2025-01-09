const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require('./initDB')();

// Welcome message route
const dek = 'halo dek welkam geni bencana banjir Kabupaten Batang';
app.get('/', (req, res) => {
  res.send(dek);
});

// Import and use banjirRoutes
const banjirRoute = require('./Routes/banjirRoutes');
app.use('/geni', banjirRoute);

// 404 handler - Pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
