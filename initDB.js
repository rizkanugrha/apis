const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

module.exports = () => {
  mongoose.set("strictQuery", true); // Pengaturan strict mode untuk query
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected...");
    })
    .catch((err) => console.error("MongoDB connection error:", err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB.");
  });

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB.");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log("Mongoose connection closed due to app termination.");
      process.exit(0);
    });
  });
};
