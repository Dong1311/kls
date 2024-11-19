const express = require('express');
const router = express.Router();
const taiLieuController = require('../app/controllers/TaiLieuController');

router.get('/summary', taiLieuController.getTaiLieuSummary);

// Tạo tài liệu mới
router.post('/', taiLieuController.createTaiLieu);

// Lấy danh sách tài liệu
router.get('/', taiLieuController.getTaiLieuList);

// Lấy chi tiết tài liệu theo ID
router.get('/:id', taiLieuController.getTaiLieuDetail);

// Cập nhật tài liệu theo ID
router.put('/:id', taiLieuController.updateTaiLieu);

// Xóa tài liệu theo ID
router.delete('/:id', taiLieuController.deleteTaiLieu);


module.exports = router;
