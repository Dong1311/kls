const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TaiLieuController {

    // Tạo mới tài liệu
    async createTaiLieu(req, res) {
        const {
            khungBienMuc,
            maDinhDanhVanBan,
            hoSoId,
            sttTrongHoSo,
            tenLoaiVanBan,
            soVanBan,
            kyHieuTaiLieu,
            ngayThangNamVB,
            tenCoQuanBanHanh,
            trichYeuNoiDung,
            ngonNgu,
            soLuongTrang,
            ghiChu,
            kyHieuThongTin,
            tuKhoa,
            cheDoSuDung,
            mucDoTinCay,
            butTich,
            tinhTrangVatLy,
            link,
            tenTaiLieu,
            ngayTao = new Date() // Nếu không có `ngayTao`, mặc định là ngày hiện tại
        } = req.body;

        try {
            const newTaiLieu = await prisma.taiLieu.create({
                data: {
                    khungBienMuc,
                    maDinhDanhVanBan,
                    hoSoId: parseInt(hoSoId, 10),
                    sttTrongHoSo: parseInt(sttTrongHoSo, 10),
                    tenLoaiVanBan,
                    soVanBan,
                    kyHieuTaiLieu,
                    ngayThangNamVB: new Date(ngayThangNamVB),
                    tenCoQuanBanHanh,
                    trichYeuNoiDung,
                    ngonNgu,
                    soLuongTrang: parseInt(soLuongTrang, 10),
                    ghiChu,
                    kyHieuThongTin,
                    tuKhoa,
                    cheDoSuDung,
                    mucDoTinCay,
                    butTich,
                    tinhTrangVatLy,
                    link,
                    tenTaiLieu,           // Thêm tên tài liệu
                    ngayTao               // Thêm ngày tạo
                }
            });
            res.status(201).json({ message: 'Tài liệu đã được tạo thành công', data: newTaiLieu });
        } catch (error) {
            console.error('Error creating TaiLieu:', error);
            res.status(500).json({ message: 'Lỗi khi tạo tài liệu', error: error.message });
        }
    }


    // Lấy danh sách tài liệu
    // async getTaiLieuList(req, res) {
    //     const { search, ngayThangNamVB } = req.query;
      
    //     try {
    //       const taiLieuList = await prisma.taiLieu.findMany({
    //         where: {
    //           trichYeuNoiDung: search ? { contains: search, mode: 'insensitive' } : undefined,
    //           ngayThangNamVB: ngayThangNamVB ? new Date(ngayThangNamVB) : undefined,
    //         },
    //       });
      
    //       res.status(200).json(taiLieuList);
    //     } catch (error) {
    //       console.error('Error fetching TaiLieu list:', error);
    //       res.status(500).json({ message: 'Lỗi khi lấy danh sách tài liệu', error: error.message });
    //     }
    //   }

    async getTaiLieuList(req, res) {
        const { search, ngayThangNamVB } = req.query;
      
        try {
          const whereCondition = {
            AND: [
              search ? { hoSo: { tieuDeHoSo: { contains: search, mode: 'insensitive' } } } : {},
              ngayThangNamVB ? { ngayThangNamVB: new Date(ngayThangNamVB) } : {},
            ],
          };
      
          const taiLieuList = await prisma.taiLieu.findMany({
            where: whereCondition,
            include: {
              hoSo: { select: { tieuDeHoSo: true, trangThai: true } }, // Lấy tên và trạng thái của hồ sơ
            },
          });
      
          res.status(200).json(taiLieuList);
        } catch (error) {
          console.error('Error fetching TaiLieu list:', error);
          res.status(500).json({ message: 'Lỗi khi lấy danh sách tài liệu', error: error.message });
        }
      }
      
      

    // Lấy chi tiết tài liệu
    async getTaiLieuDetail(req, res) {
        const { id } = req.params;
        try {
            const taiLieu = await prisma.taiLieu.findUnique({
                where: { id: parseInt(id, 10) }
            });

            if (!taiLieu) {
                return res.status(404).json({ message: 'Không tìm thấy tài liệu' });
            }

            res.status(200).json(taiLieu);
        } catch (error) {
            console.error('Error fetching TaiLieu details:', error);
            res.status(500).json({ message: 'Lỗi khi lấy chi tiết tài liệu', error: error.message });
        }
    }

    // Cập nhật tài liệu
    async updateTaiLieu(req, res) {
        const { id } = req.params;
        const {
            khungBienMuc,
            maDinhDanhVanBan,
            hoSoId,
            sttTrongHoSo,
            tenLoaiVanBan,
            soVanBan,
            kyHieuTaiLieu,
            ngayThangNamVB,
            tenCoQuanBanHanh,
            trichYeuNoiDung,
            ngonNgu,
            soLuongTrang,
            ghiChu,
            kyHieuThongTin,
            tuKhoa,
            cheDoSuDung,
            mucDoTinCay,
            butTich,
            tinhTrangVatLy,
            link,
            tenTaiLieu, 
            ngayTao        
        } = req.body;
    
        try {
            const updatedTaiLieu = await prisma.taiLieu.update({
                where: { id: parseInt(id, 10) },
                data: {
                    khungBienMuc,
                    maDinhDanhVanBan,
                    hoSoId: parseInt(hoSoId, 10),
                    sttTrongHoSo: parseInt(sttTrongHoSo, 10),
                    tenLoaiVanBan,
                    soVanBan,
                    kyHieuTaiLieu,
                    ngayThangNamVB: new Date(ngayThangNamVB),
                    tenCoQuanBanHanh,
                    trichYeuNoiDung,
                    ngonNgu,
                    soLuongTrang: parseInt(soLuongTrang, 10),
                    ghiChu,
                    kyHieuThongTin,
                    tuKhoa,
                    cheDoSuDung,
                    mucDoTinCay,
                    butTich,
                    tinhTrangVatLy,
                    link,
                    tenTaiLieu, 
                    ngayTao  
                }
            });
            res.status(200).json({ message: 'Cập nhật tài liệu thành công', data: updatedTaiLieu });
        } catch (error) {
            console.error('Error updating TaiLieu:', error);
            res.status(500).json({ message: 'Lỗi khi cập nhật tài liệu', error: error.message });
        }
    }
    
    // Xóa tài liệu
    async deleteTaiLieu(req, res) {
        const { id } = req.params;
        try {
            await prisma.taiLieu.delete({
                where: { id: parseInt(id, 10) }
            });
            res.status(200).json({ message: 'Xóa tài liệu thành công' });
        } catch (error) {
            console.error('Error deleting TaiLieu:', error);
            res.status(500).json({ message: 'Lỗi khi xóa tài liệu', error: error.message });
        }
    }

    // Lấy danh sách tài liệu thuộc một hồ sơ
    async getTaiLieuByHoSoId(req, res) {
        const { hoSoId } = req.params;
        try {
            const taiLieuList = await prisma.taiLieu.findMany({
                where: { hoSoId: parseInt(hoSoId, 10) },
            });
            res.status(200).json(taiLieuList);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy danh sách tài liệu', error: error.message });
        }
    }

    // Thêm tài liệu vào một hồ sơ
    async addTaiLieuToHoSo(req, res) {
        const { hoSoId } = req.params;
        const {
            khungBienMuc,
            maDinhDanhVanBan,
            sttTrongHoSo,
            tenLoaiVanBan,
            soVanBan,
            kyHieuTaiLieu,
            ngayThangNamVB,
            tenCoQuanBanHanh,
            trichYeuNoiDung,
            ngonNgu,
            soLuongTrang,
            ghiChu,
            kyHieuThongTin,
            tuKhoa,
            cheDoSuDung,
            mucDoTinCay,
            butTich,
            tinhTrangVatLy,
            link,
            tenTaiLieu,
            ngayTao = new Date() // Nếu không có `ngayTao`, mặc định là ngày hiện tại
        } = req.body;

        try {
            const newTaiLieu = await prisma.taiLieu.create({
                data: {
                    hoSoId: parseInt(hoSoId, 10),
                    khungBienMuc,
                    maDinhDanhVanBan,
                    sttTrongHoSo: parseInt(sttTrongHoSo, 10),
                    tenLoaiVanBan,
                    soVanBan,
                    kyHieuTaiLieu,
                    ngayThangNamVB: new Date(ngayThangNamVB),
                    tenCoQuanBanHanh,
                    trichYeuNoiDung,
                    ngonNgu,
                    soLuongTrang: parseInt(soLuongTrang, 10),
                    ghiChu,
                    kyHieuThongTin,
                    tuKhoa,
                    cheDoSuDung,
                    mucDoTinCay,
                    butTich,
                    tinhTrangVatLy,
                    link,
                    tenTaiLieu, 
                    ngayTao  
                }
            });
            res.status(201).json({ message: 'Tài liệu đã được thêm vào hồ sơ', data: newTaiLieu });
        } catch (error) {
            if (error.code === 'P2002' && error.meta?.target.includes('maDinhDanhVanBan')) {
                return res.status(400).json({ message: 'Mã định danh văn bản đã tồn tại. Vui lòng chọn giá trị khác.' });
            }
            res.status(500).json({ message: 'Lỗi khi thêm tài liệu vào hồ sơ', error: error.message });
            console.log(error);
        }
    }

    // Lấy tên hồ sơ dựa trên hoSoId
    async getHoSoNameAndTrangThai(req, res) {
        const { hoSoId } = req.params;
        try {
            const hoSo = await prisma.hoSo.findUnique({
                where: { id: parseInt(hoSoId, 10) },
                select: { tieuDeHoSo: true, trangThai: true } // Lấy cả `tieuDeHoSo` và `trangThai`
            });
    
            if (!hoSo) {
                return res.status(404).json({ message: 'Không tìm thấy hồ sơ' });
            }
    
            res.status(200).json({ 
                tenHoSo: hoSo.tieuDeHoSo, 
                trangThai: hoSo.trangThai 
            });
        } catch (error) {
            console.error('Error fetching HoSo name and status:', error);
            res.status(500).json({ message: 'Lỗi khi lấy tên và trạng thái hồ sơ', error: error.message });
        }
    }
    

}

module.exports = new TaiLieuController();
