const mongoose = require("mongoose");

const banjirSchema = new mongoose.Schema({
  bencana: { type: String, required: [true, "Bencana wajib diisi"] },
  waktu: { type: Date, required: [true, "Waktu kejadian wajib diisi"] },
  lokasi: { type: String, required: [true, "Lokasi wajib diisi"] },
  penyebab: String,
  kronologi: String,
  pengungsi: { type: Number, default: 0, min: [0, "Jumlah pengungsi tidak boleh negatif"] },
});

module.exports = mongoose.model("Banjir", banjirSchema);
