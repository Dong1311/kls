const express = require("express");
const router = express.Router();
const CTPhieuYCControlelr = require("../app/controllers/CTPhieuYCController");

router.get("/thong-ke", CTPhieuYCControlelr.getThongKe);

router.get("/thong-ke-2", CTPhieuYCControlelr.getThongKe2);

module.exports = router;
