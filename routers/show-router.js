const {
  create: createShow,
  findAll: findAllShow,
  deleteOne,
  updateOne,
  findOneById,
} = require("../controllers/show-controller");
const express = require("express");
const router = express.Router();

//endpoints here
router.post("/", createShow);
router.get("/", findAllShow);
router.get("/:id", findOneById);
router.put("/:id", updateOne);
router.delete("/:id", deleteOne);

module.exports = { router };
