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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(400, 'Invalid Banjir ID');
    }

    const banjir = await BanjirModels.findById(id);
    if (!banjir) {
      throw createError(404, 'Banjir record does not exist.');
    }
    res.send(banjir);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const updateBanjir = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(400, 'Invalid Banjir ID');
    }

    const updatedBanjir = await BanjirModels.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBanjir) {
      throw createError(404, 'Banjir record does not exist.');
    }
    res.status(200).json(updatedBanjir);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const deleteBanjir = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(400, 'Invalid Banjir ID');
    }

    const result = await BanjirModels.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, 'Banjir record does not exist.');
    }
    res.send(result);
  } catch (error) {
    console.error(error.message);
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
