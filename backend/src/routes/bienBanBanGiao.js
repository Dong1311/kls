const express = require('express');
const router = express.Router();
const bienBanBanGiaoController = require('../app/controllers/BienBanBanGiaoController');

// Route tạo mới biên bản bàn giao
router.post('/', bienBanBanGiaoController.createBienBanBanGiao);

// Route lấy danh sách tất cả biên bản bàn giao
router.get('/', bienBanBanGiaoController.getBienBanBanGiaoList);

// Route lấy chi tiết một biên bản bàn giao theo id
router.get('/:id', bienBanBanGiaoController.getBienBanBanGiaoDetail);

// Route cập nhật một biên bản bàn giao theo id
router.put('/:id', bienBanBanGiaoController.updateBienBanBanGiao);

// Route xóa một biên bản bàn giao theo id
router.delete('/:id', bienBanBanGiaoController.deleteBienBanBanGiao);

router.get('/:bienBanBanGiaoId/ho-so', bienBanBanGiaoController.getHoSoByBienBanBanGiaoId);


module.exports = router;
