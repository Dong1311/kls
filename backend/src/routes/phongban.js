const express = require('express');
const router = express.Router();
const PhongBanController = require('../app/controllers/PhongBanController');

// Lấy danh sách tất cả phòng ban
router.get('/', PhongBanController.getAllPhongBan);

// Lấy thông tin phòng ban theo ID
router.get('/:id', PhongBanController.getPhongBanById);

// Tạo mới phòng ban
router.post('/', PhongBanController.createPhongBan);

// Cập nhật phòng ban theo ID
router.put('/:id', PhongBanController.updatePhongBan);

// Xóa phòng ban theo ID
router.delete('/:id', PhongBanController.deletePhongBan);

module.exports = router;
