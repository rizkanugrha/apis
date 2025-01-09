import mongoose from 'mongoose';

const banjirSchema = new mongoose.Schema(
  {
    no: {
      type: Number,
      required: true,
    },
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

export const BanjirModels = mongoose.model('Banjir', banjirSchema);
