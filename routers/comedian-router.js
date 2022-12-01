const {
  createComedian,
  findAllComedians,
  findOneComedianById,
  updateOneComedianById,
  deleteOneComedianById,
} = require("../controllers/comedian-controller");
const express = require("express");
const router = express.Router();

router.post("/", createComedian);
router.get("/", findAllComedians);
router.get("/:id", findOneComedianById);
router.put("/:id", updateOneComedianById);
router.delete("/:id", deleteOneComedianById);

module.exports = { router };
