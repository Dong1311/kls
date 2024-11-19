const express = require("express");
const router = express.Router();
const PhieuTraController = require("../app/controllers/PhieuTraController");

router.get("/thong-ke", PhieuTraController.getThongKe);

module.exports = router;
