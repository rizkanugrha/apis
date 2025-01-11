const mongoose = require("mongoose");

const banjirSchema = new mongoose.Schema(
  {
    bencana: {
      type: String,
      default: "Banjir", // Nilai default
    },
    waktu: {
      type: Date,
      required: [true, "Waktu kejadian wajib diisi"],
    },
    lokasi: {
      type: String,
      required: [true, "Lokasi kejadian wajib diisi"],
    },
    penyebab: {
      type: String,
      required: [true, "Penyebab wajib diisi"],
    },
    kronologi: {
      type: String,
      required: [true, "Kronologi wajib diisi"],
    },
    pengungsi: {
      type: Number,
      default: 0,
      min: [0, "Jumlah pengungsi tidak boleh negatif"],
    },
  },
  { timestamps: true }
);

const BanjirModels = mongoose.model("Banjir", banjirSchema);

module.exports = { BanjirModels };
