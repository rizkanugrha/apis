import express from 'express';
import createError from 'http-errors';
import { openDB } from './initDB.js';
import BanjirRoutes from './Routes/banjirRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database
await openDB();

// Mount Banjir Routes at /api/banjir
app.use('/api/banjir', BanjirRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
