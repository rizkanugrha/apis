const express = require("express");
const {
  getAllBanjir,
  createNewBanjir,
  findBanjirById,
  updateBanjir,
  deleteBanjir,
} = require("../Controllers/banjirControllers");

const router = express.Router();

router.get("/", getAllBanjir);
router.post("/", createNewBanjir);
router.get("/:id", findBanjirById);
router.patch("/:id", updateBanjir);
router.delete("/:id", deleteBanjir);

module.exports = router;
