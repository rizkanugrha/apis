const { BanjirModels } = require("../Models/banjirModels");
const createError = require("http-errors");
const mongoose = require("mongoose");

const getAllBanjir = async (req, res, next) => {
  try {
    const results = await BanjirModels.find();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const createNewBanjir = async (req, res, next) => {
  try {
    const newBanjir = new BanjirModels(req.body);
    const savedBanjir = await newBanjir.save();
    res.json(savedBanjir);
  } catch (error) {
    next(error);
  }
};

const updateBanjir = async (req, res, next) => {
  try {
    const updated = await BanjirModels.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) throw createError(404, "Data tidak ditemukan.");
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteBanjir = async (req, res, next) => {
  try {
    const deleted = await BanjirModels.findByIdAndDelete(req.params.id);
    if (!deleted) throw createError(404, "Data tidak ditemukan.");
    res.json({ message: "Data berhasil dihapus.", _id: deleted._id });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBanjir, createNewBanjir, updateBanjir, deleteBanjir };
