const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());

// Atau gunakan konfigurasi spesifik
app.use(cors({
  origin: ["https://geni.tugas-cool.my.id/geni/", "http://localhost:3000", "http://localhost:5173"], // Izinkan domain frontend Anda
  methods: ["GET", "POST", "PATCH", "DELETE"], // Metode HTTP yang diizinkan
  allowedHeaders: ["Content-Type"], // Header yang diizinkan
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require("./initDB")();

// Welcome message route
app.get("/", (req, res) => {
  res.send("API Bencana Banjir Kabupaten Batang");
});

// Import and use routes
const banjirRoute = require("./Routes/banjirRoutes");
app.use("/geni", banjirRoute);

// 404 handler
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
