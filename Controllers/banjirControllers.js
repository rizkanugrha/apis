const createError = require('http-errors');
const mongoose = require('mongoose');
const { BanjirModels } = require('../Models/banjirModels');

const getAllBanjir = async (req, res, next) => {
  try {
    const results = await BanjirModels.find({}, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const createNewBanjir = async (req, res, next) => {
  try {
    const banjir = new BanjirModels(req.body);
    const result = await banjir.save();
    res.send(result);
  } catch (error) {
    console.error(error.message);
    if (error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
};

const findBanjirById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const banjir = await BanjirModels.findById(id);
    if (!banjir) {
      throw createError(404, 'Banjir record does not exist.');
    }
    res.send(banjir);
  } catch (error) {
    console.error(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Banjir id'));
      return;
    }
    next(error);
  }
};

export const updateBanjir = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBanjir = await Banjir.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBanjir) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(updatedBanjir);
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui data", error });
  }
};

const deleteBanjir = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await BanjirModels.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, 'Banjir record does not exist.');
    }
    res.send(result);
  } catch (error) {
    console.error(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Banjir id'));
      return;
    }
    next(error);
  }
};

module.exports = {
  getAllBanjir,
  createNewBanjir,
  findBanjirById,
  updateBanjir,
  deleteBanjir,
};
