const createError = require("http-errors");
const { BanjirModels } = require("../Models/banjirModels");
const asyncHandler = require("express-async-handler");

// Get All Records
const getAllBanjir = asyncHandler(async (req, res) => {
  const results = await BanjirModels.find({}, { __v: 0 });
  res.status(200).json(results);
});

// Create New Record
const createNewBanjir = asyncHandler(async (req, res) => {
  const banjir = new BanjirModels(req.body);
  const result = await banjir.save();
  res.status(201).json(result);
});

// Find Record By ID
const findBanjirById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const banjir = await BanjirModels.findById(id);
  if (!banjir) throw createError(404, "Banjir record does not exist.");
  res.status(200).json(banjir);
});

// Update Record By ID
const updateBanjir = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedBanjir = await BanjirModels.findByIdAndUpdate(id, req.body, {
    new: true, // Return updated document
    runValidators: true, // Ensure validation runs on update
  });
  if (!updatedBanjir) throw createError(404, "Data tidak ditemukan.");
  res.status(200).json(updatedBanjir);
});

// Delete Record By ID
const deleteBanjir = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await BanjirModels.findByIdAndDelete(id);
  if (!result) throw createError(404, "Banjir record does not exist.");
  res.status(200).json({ message: "Data berhasil dihapus", result });
});

module.exports = {
  getAllBanjir,
  createNewBanjir,
  findBanjirById,
  updateBanjir,
  deleteBanjir,
};
