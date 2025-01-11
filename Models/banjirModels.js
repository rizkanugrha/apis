const mongoose = require('mongoose');

const banjirSchema = new mongoose.Schema(
  {
    bencana: {
      type: String,
      required: true,
    },
    waktu: {
      type: Date,
      required: true,
    },
    lokasi: {
      type: String,
      required: true,
    },
    penyebab: {
      type: String,
      required: true,
    },
    kronologi: {
      type: String,
      required: true,
    },
    pengungsi: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const BanjirModels = mongoose.model('Banjir', banjirSchema);

module.exports = { BanjirModels };
