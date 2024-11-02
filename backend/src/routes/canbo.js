const express = require('express');
const router = express.Router();
const CanBoController = require('../app/controllers/CanBoController');

// Định nghĩa route lấy chi tiết cán bộ theo maCanBo
router.get('/:maCanBo', CanBoController.getCanBoDetail);
// Route để thêm mới hồ sơ


module.exports = router;
