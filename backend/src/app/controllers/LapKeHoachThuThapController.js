const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LapKeHoachThuThapController {

    postLapKeHoach = async (req, res) => {
        console.log('Received request body:', req.body);
    
        const { soKeHoach, tieuDe, nguoiTao, nguoiDuyet, noiDung, donViNopLuuId, ngayBatDau, ngayKetThuc, trangThai } = req.body;
    
        if (!soKeHoach || !tieuDe || !nguoiTao || !trangThai) {
            console.log("Missing required fields");
            return res.status(400).json({ message: 'Các trường bắt buộc không được để trống' });
        }
    
        try {
            const keHoachExists = await prisma.keHoachThuThap.findUnique({ where: { soKeHoach } });
            if (keHoachExists) {
                console.log("Kế hoạch thu thập đã tồn tại");
                return res.status(400).json({ message: 'Kế hoạch thu thập đã tồn tại' });
            }
            const newKeHoach = await prisma.keHoachThuThap.create({
                data: {
                    soKeHoach,
                    tieuDe,
                    nguoiTao,
                    nguoiDuyet: nguoiDuyet || null,
                    noiDung,
                    donViNopLuuId: donViNopLuuId ? parseInt(donViNopLuuId) : null, // Sử dụng donViNopLuuId thay vì donViNopLuu
                    ngayBatDau: ngayBatDau ? new Date(ngayBatDau) : null,
                    ngayKetThuc: ngayKetThuc ? new Date(ngayKetThuc) : null,
                    trangThai,
                },
            });
    
            res.status(201).json({ message: 'Lập kế hoạch thu thập thành công', keHoach: newKeHoach });
        } catch (error) {
            console.error('Error during planning creation:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
    getAllKeHoachThuThap = async (req, res) => {
        try {
            const { tieuDe, nguoiDuyet, tuNgay, trangThai } = req.query;
    
            const filter = {
                where: {}
            };
    
            if (tieuDe) {
                filter.where.tieuDe = {
                    contains: tieuDe,
                    mode: 'insensitive'
                };
            }
    
            if (nguoiDuyet) {
                filter.where.nguoiDuyet = {
                    contains: nguoiDuyet,
                    mode: 'insensitive'
                };
            }
    
            if (tuNgay) {
                filter.where.ngayBatDau = {
                    equals: new Date(tuNgay)
                };
            }
    
            if (trangThai) {
                filter.where.trangThai = trangThai;
            }
    
            const keHoachs = await prisma.keHoachThuThap.findMany(filter);
            
            const statusOrder = {
                'Tạo mới': 0,
                'Từ chối': 1,
                'Đã trình duyệt': 2
            };
    
            keHoachs.sort((a, b) => {
                const statusA = statusOrder[a.trangThai] !== undefined ? statusOrder[a.trangThai] : 999;
                const statusB = statusOrder[b.trangThai] !== undefined ? statusOrder[b.trangThai] : 999;
                return statusA - statusB;
            });
    
            res.status(200).json(keHoachs);
        } catch (error) {
            console.error('Error retrieving ke hoach thu thap:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
    
    getKeHoachThuThapById = async (req, res) => {
        const { id } = req.params;
    
        try {
            const keHoach = await prisma.keHoachThuThap.findUnique({
                where: { id: parseInt(id) },
            });
    
            if (!keHoach) {
                return res.status(404).json({ message: 'Không tìm thấy kế hoạch thu thập' });
            }
    
            res.status(200).json(keHoach);
        } catch (error) {
            console.error('Error retrieving ke hoach thu thap:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
    updateKeHoachThuThap = async (req, res) => {
        const { id } = req.params;
        const { soKeHoach, tieuDe, nguoiTao, nguoiDuyet, noiDung, donViNopLuuId, ngayBatDau, ngayKetThuc, trangThai } = req.body;
    
        try {
            const updatedKeHoach = await prisma.keHoachThuThap.update({
                where: { id: parseInt(id) },
                data: {
                    soKeHoach,
                    tieuDe,
                    nguoiTao,
                    nguoiDuyet,
                    noiDung,
                    donViNopLuuId: donViNopLuuId ? parseInt(donViNopLuuId) : null, 
                    ngayBatDau: ngayBatDau ? new Date(ngayBatDau) : null,
                    ngayKetThuc: ngayKetThuc ? new Date(ngayKetThuc) : null,
                    trangThai,
                },
            });
    
            res.status(200).json({ message: 'Cập nhật kế hoạch thu thập thành công', keHoach: updatedKeHoach });
        } catch (error) {
            console.error('Error updating ke hoach thu thap:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
    deleteKeHoachThuThap = async (req, res) => {
        const { id } = req.params;
    
        try {
            await prisma.keHoachThuThap.delete({
                where: { id: parseInt(id) },
            });
    
            res.status(200).json({ message: 'Xóa kế hoạch thu thập thành công' });
        } catch (error) {
            console.error('Error deleting ke hoach thu thap:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    

    updateTaiLieuHD = async (req, res) => {
        const { id } = req.params;  // ID của kế hoạch thu thập
        const { taiLieuHD } = req.body;  // Đường dẫn file URL

        if (!taiLieuHD) {
            return res.status(400).json({ message: 'Không có tài liệu để cập nhật' });
        }

        try {
            // Cập nhật trường `taiLieuHD` của kế hoạch thu thập trong Postgres
            const updatedKeHoach = await prisma.keHoachThuThap.update({
            where: { id: parseInt(id) },
            data: { taiLieuHD },
            });

            res.status(200).json({ message: 'Cập nhật tài liệu thành công', keHoach: updatedKeHoach });
        } catch (error) {
            console.error('Lỗi khi cập nhật tài liệu:', error);
            res.status(500).json({ message: 'Lỗi hệ thống' });
        }
    };

    updateTrangThaiKeHoach = async (req, res) => {
        const { id } = req.params;
        const { trangThai, nguoiDuyet } = req.body;  // Lấy trạng thái và người duyệt mới từ request body
    
        if (!trangThai) {
            return res.status(400).json({ message: 'Trạng thái không được để trống' });
        }
    
        try {
            // Cập nhật trạng thái và người duyệt của kế hoạch thu thập
            const updatedKeHoach = await prisma.keHoachThuThap.update({
                where: { id: parseInt(id) },
                data: { 
                    trangThai,
                    nguoiDuyet: nguoiDuyet || null,  // Cập nhật người duyệt nếu có, nếu không thì giữ nguyên
                },
            });
    
            res.status(200).json({ message: 'Cập nhật trạng thái và người duyệt thành công', keHoach: updatedKeHoach });
        } catch (error) {
            console.error('Error updating ke hoach thu thap:', error);
            res.status(500).json({ message: 'Lỗi hệ thống' });
        }
    };
    

    createTaiLieuHuongDan = async (req, res) => {
        const { tenTaiLieu, link, keHoachThuThapId } = req.body;
      
        try {
          // Kiểm tra xem keHoachThuThapId có được cung cấp hay không
          if (!keHoachThuThapId) {
            return res.status(400).json({ message: 'KeHoachThuThapId không được để trống' });
          }
      
          // Chuyển đổi keHoachThuThapId sang kiểu số nguyên
          const keHoachIdInt = parseInt(keHoachThuThapId, 10);
      
          const newTaiLieu = await prisma.taiLieuHuongDan.create({
            data: {
              tenTaiLieu,
              ngayTao: new Date(), // Ngày tạo là ngày hôm nay
              link,
              keHoachThuThapId: keHoachIdInt,  // Thêm keHoachThuThapId là số nguyên vào dữ liệu
            },
          });
      
          res.status(201).json({ message: 'Tạo tài liệu hướng dẫn thành công', taiLieu: newTaiLieu });
        } catch (error) {
          console.error('Error creating TaiLieuHuongDan:', error);
          res.status(500).json({ message: 'Lỗi hệ thống' });
        }
    };
    
    // Lấy danh sách tài liệu hướng dẫn dựa trên id của kế hoạch thu thập
    getTaiLieuHuongDanByKeHoachId = async (req, res) => {
        const { id } = req.params;  // Lấy id của kế hoạch thu thập từ URL
        
        try {
        // Tìm tất cả tài liệu có `keHoachThuThapId` là id của kế hoạch
        const taiLieuList = await prisma.taiLieuHuongDan.findMany({
            where: { keHoachThuThapId: parseInt(id) },  // Lọc theo kế hoạch thu thập
        });
    
        if (!taiLieuList || taiLieuList.length === 0) {
            return res.status(404).json({ message: 'Không có tài liệu nào' });
        }
    
        res.status(200).json(taiLieuList);  // Trả về danh sách tài liệu
        } catch (error) {
        console.error('Error retrieving tài liệu hướng dẫn:', error);
        res.status(500).json({ message: 'Lỗi hệ thống' });
        }
    };
  
    deleteTaiLieuHuongDan = async (req, res) => {
        const { id } = req.params;  // ID của tài liệu cần xóa

        try {
            // Kiểm tra xem tài liệu có tồn tại không
            const taiLieu = await prisma.taiLieuHuongDan.findUnique({
                where: { id: parseInt(id) }
            });

            if (!taiLieu) {
                return res.status(404).json({ message: 'Tài liệu không tồn tại' });
            }

            // Thực hiện xóa tài liệu
            await prisma.taiLieuHuongDan.delete({
                where: { id: parseInt(id) }
            });

            return res.status(200).json({ message: 'Xóa tài liệu thành công' });
        } catch (error) {
            console.error('Lỗi khi xóa tài liệu:', error);
            return res.status(500).json({ message: 'Lỗi hệ thống khi xóa tài liệu' });
        }
    }  

    // Lấy danh sách hồ sơ dựa trên ID kế hoạch thu thập
  // Lấy danh sách hồ sơ dựa trên ID kế hoạch thu thập và (nếu có) trạng thái
getHoSoByKeHoachThuThapId = async (req, res) => {
    const { id } = req.params;
    const { trangThai } = req.query; // Lấy trạng thái từ query
  
    try {
      const hoSoList = await prisma.hoSo.findMany({
        where: {
          keHoachThuThapId: parseInt(id),
          ...(trangThai && { trangThai }) // Thêm điều kiện lọc nếu có tham số trangThai
        },
      });
  
      if (!hoSoList || hoSoList.length === 0) {
        return res.status(404).json({ message: 'Không có hồ sơ nào được tìm thấy với điều kiện lọc' });
      }
  
      res.status(200).json(hoSoList);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách hồ sơ:', error);
      res.status(500).json({ message: 'Lỗi khi lấy danh sách hồ sơ' });
    }
  };
  
    
}

module.exports = new LapKeHoachThuThapController();
