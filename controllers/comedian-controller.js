// Controllers are responsible to handle request and response.

const { Comedian } = require("../models");
const httpStatus = require("http-status");

// Implement create function
const createComedian = async (req, res) => {
  try {
    const result = await Comedian.create(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const findAllComedians = async (req, res) => {
  try {
    // "req.query" is used when query information is provided like below.
    // http://localhost:3000/comedians?location=London
    const result = await Comedian.find(req.query).exec();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const findOneComedianById = async (req, res) => {
  try {
    const result = await Comedian.findById(req.params.id).exec();
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const updateOneComedianById = async (req, res) => {
  try {
    const result = await Comedian.updateOne({ _id: req.params.id }, req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteOneComedianById = async (req, res) => {
  try {
    const result = await Comedian.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (e) {
    console.error(e);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

// Export functions
module.exports = {
  createComedian,
  findAllComedians,
  findOneComedianById,
  updateOneComedianById,
  deleteOneComedianById,
};
