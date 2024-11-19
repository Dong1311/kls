const express = require("express");
const router = express.Router();
const HopCapController = require("../app/controllers/HopCapController");

router.get("/thong-ke", HopCapController.getThongKeHopCap);

module.exports = router;
