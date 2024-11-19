const express = require("express");
const router = express.Router();
const CTPhieuYCControlelr = require("../app/controllers/CTPhieuYCController");

router.get("/thong-ke", CTPhieuYCControlelr.getThongKe);

module.exports = router;
