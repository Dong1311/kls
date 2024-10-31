// src/routes/HoSoRoutes.js
const express = require('express');
const router = express.Router();
const HoSoController = require('../app/controllers/HoSoController');

// Route để thêm mới hồ sơ
router.post('/', HoSoController.createHoSo);

// Route để lấy danh sách hồ sơ
router.get('/', HoSoController.getHoSoList);

// Route để cập nhật hồ sơ
router.put('/:id', HoSoController.updateHoSo);

// Route để xóa hồ sơ
router.delete('/:id', HoSoController.deleteHoSo);

// Route lấy chi tiết hồ sơ
router.get('/:id', HoSoController.getHoSoDetail);

module.exports = router;
