const express = require('express');
const router = express.Router();
const HoSoController = require('../app/controllers/HoSoController');
const TaiLieuController = require('../app/controllers/TaiLieuController');

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

// Route để lấy danh sách tài liệu của một hồ sơ
router.get('/:hoSoId/tai-lieu', TaiLieuController.getTaiLieuByHoSoId);

// Route để thêm tài liệu vào một hồ sơ
router.post('/:hoSoId/tai-lieu', TaiLieuController.addTaiLieuToHoSo);

// Route để xóa tài liệu
router.delete('/tai-lieu/:taiLieuId', TaiLieuController.deleteTaiLieu);

// Route để lấy tên hồ sơ dựa trên hoSoId
router.get('/:hoSoId/name-status', TaiLieuController.getHoSoNameAndTrangThai);

module.exports = router;
