const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class HoSoController {
    // Thêm mới hồ sơ
    createHoSo = async (req, res) => {
        const {
            maHoSo,
            maDinhDanhCoQuan,
            mucLucSoNamHS,
            soVaKyHieuHoSo,
            tieuDeHoSo,
            thoiHanBaoQuan,
            cheDoSuDung,
            ngonNgu,
            ngayBatDau,
            ngayKetThuc,
            tongSoTaiLieu,
            tongSoTrang,
            tinhTrangVatLy,
            tuKhoa,
            chuGiai,
            kyHieuThongTin,
            nguoiTao,
            ngayTao,
            donViNopLuu,
            trangThai,
            keHoachThuThapId,
        } = req.body;

        try {
            const newHoSo = await prisma.hoSo.create({
                data: {
                    maHoSo,
                    maDinhDanhCoQuan,
                    mucLucSoNamHS,
                    soVaKyHieuHoSo,
                    tieuDeHoSo,
                    thoiHanBaoQuan,
                    cheDoSuDung: cheDoSuDung || null,
                    ngonNgu,
                    ngayBatDau: ngayBatDau ? new Date(ngayBatDau) : null,
                    ngayKetThuc: ngayKetThuc ? new Date(ngayKetThuc) : null,
                    tongSoTaiLieu: parseInt(tongSoTaiLieu, 10) || 0,
                    tongSoTrang: parseInt(tongSoTrang, 10) || 0,
                    tinhTrangVatLy,
                    tuKhoa,
                    chuGiai,
                    kyHieuThongTin,
                    nguoiTao,
                    ngayTao: new Date(ngayTao),
                    donViNopLuu: donViNopLuu || null,
                    trangThai,
                    keHoachThuThapId: parseInt(keHoachThuThapId, 10) || null,
                },
            });

            res.status(201).json({ message: 'Hồ sơ đã được tạo thành công', data: newHoSo });
        } catch (error) {
            console.error('Error creating HoSo:', error);
            res.status(500).json({ message: 'Lỗi tạo hồ sơ', error: error.message });
        }
    };

    // Lấy danh sách hồ sơ có thể lọc theo trạng thái và tìm kiếm
    getHoSoList = async (req, res) => {
        const { trangThai, search, nguoiTao, ngayTao } = req.query;
      
        try {
          const hoSoList = await prisma.hoSo.findMany({
            where: {
              trangThai: trangThai || undefined,
              AND: [
                ngayTao ? { ngayTao: { equals: new Date(ngayTao) } } : {},
                {
                  OR: [
                    search ? { maHoSo: { contains: search, mode: 'insensitive' } } : {},
                    search ? { tieuDeHoSo: { contains: search, mode: 'insensitive' } } : {},
                    nguoiTao ? { nguoiTao: { contains: nguoiTao, mode: 'insensitive' } } : {},
                  ],
                },
              ],
            },
            include: {
              keHoachThuThap: {  // Kết nối với bảng KeHoachThuThap
                select: {
                  tieuDe: true,  // Lấy tên kế hoạch (tieuDe)
                },
              },
            },
          });
      
          res.status(200).json(hoSoList);
        } catch (error) {
          console.error('Error fetching HoSo list:', error);
          res.status(500).json({ message: 'Lỗi khi lấy danh sách hồ sơ' });
        }
      };
      
   

    // Lấy chi tiết hồ sơ
    getHoSoDetail = async (req, res) => {
        const { id } = req.params;

        try {
            const hoSo = await prisma.hoSo.findUnique({
                where: { id: parseInt(id, 10) },  // Ép kiểu id thành Int
            });

            if (!hoSo) {
                return res.status(404).json({ message: 'Không tìm thấy hồ sơ' });
            }

            res.status(200).json(hoSo);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết hồ sơ:', error);
            res.status(500).json({ message: 'Lỗi khi lấy chi tiết hồ sơ', error: error.message });
        }
    };



    // Cập nhật hồ sơ
    updateHoSo = async (req, res) => {
        const { id } = req.params;
        const {
            maHoSo,
            maDinhDanhCoQuan,
            mucLucSoNamHS,
            soVaKyHieuHoSo,
            tieuDeHoSo,
            thoiHanBaoQuan,
            cheDoSuDung,
            ngonNgu,
            ngayBatDau,
            ngayKetThuc,
            tongSoTaiLieu,
            tongSoTrang,
            tinhTrangVatLy,
            tuKhoa,
            chuGiai,
            kyHieuThongTin,
            nguoiTao,
            ngayTao,
            donViNopLuu,
            trangThai,
        } = req.body;

        try {
            const updatedHoSo = await prisma.hoSo.update({
                where: { id: parseInt(id, 10) },
                data: {
                    maHoSo,
                    maDinhDanhCoQuan,
                    mucLucSoNamHS,
                    soVaKyHieuHoSo,
                    tieuDeHoSo,
                    thoiHanBaoQuan,
                    cheDoSuDung,
                    ngonNgu,
                    ngayBatDau: ngayBatDau ? new Date(ngayBatDau) : null,
                    ngayKetThuc: ngayKetThuc ? new Date(ngayKetThuc) : null,
                    tongSoTaiLieu: parseInt(tongSoTaiLieu, 10) || 0,
                    tongSoTrang: parseInt(tongSoTrang, 10) || 0,
                    tinhTrangVatLy,
                    tuKhoa,
                    chuGiai,
                    kyHieuThongTin,
                    nguoiTao,
                    ngayTao: new Date(ngayTao),
                    donViNopLuu,
                    trangThai,
                },
            });

            res.status(200).json({ message: 'Cập nhật hồ sơ thành công', data: updatedHoSo });
        } catch (error) {
            console.error('Error updating HoSo:', error);
            res.status(500).json({ message: 'Lỗi khi cập nhật hồ sơ', error: error.message });
        }
    };

    // Xóa hồ sơ
    deleteHoSo = async (req, res) => {
        const { id } = req.params;
        try {
            await prisma.hoSo.delete({
                where: { id: parseInt(id, 10) },
            });
            res.status(200).json({ message: 'Xóa hồ sơ thành công' });
        } catch (error) {
            console.error('Error deleting HoSo:', error);
            res.status(500).json({ message: 'Lỗi khi xóa hồ sơ', error: error.message });
        }
    };
}

module.exports = new HoSoController();
