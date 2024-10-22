const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LapKeHoachThuThapController {

    // Create: Tạo mới một kế hoạch thu thập
    postLapKeHoach = async (req, res) => {
        console.log('Received request body:', req.body);

        const { soKeHoach, tieuDe, nguoiTao, nguoiDuyet, noiDung, donViNopLuu, ngayBatDau, ngayKetThuc, trangThai } = req.body;

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
                    nguoiDuyet,
                    noiDung,
                    donViNopLuu,
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
            const { tieuDe, nguoiDuyet, tuNgay } = req.query; 
    
            const filter = {
                where: {}
            };
    
            if (tieuDe) {
                filter.where.tieuDe = {
                    contains: tieuDe, 
                    mode: 'insensitive'
                };
            }
    
            // Nếu có tham số người duyệt, lọc theo người duyệt
            if (nguoiDuyet) {
                filter.where.nguoiDuyet = {
                    contains: nguoiDuyet,
                    mode: 'insensitive'
                };
            }
    
            // Nếu có tham số ngày bắt đầu, lọc theo ngày bắt đầu
            if (tuNgay) {
                filter.where.ngayBatDau = {
                    gte: new Date(tuNgay) 
                };
            }
    
            // Thực hiện truy vấn với các điều kiện lọc
            const keHoachs = await prisma.keHoachThuThap.findMany(filter);
            res.status(200).json(keHoachs);
        } catch (error) {
            console.error('Error retrieving ke hoach thu thap:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    

    // Read: Lấy chi tiết một kế hoạch thu thập dựa trên ID
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

    // Update: Cập nhật thông tin kế hoạch thu thập dựa trên ID
    updateKeHoachThuThap = async (req, res) => {
        const { id } = req.params;
        const { soKeHoach, tieuDe, nguoiTao, nguoiDuyet, noiDung, donViNopLuu, ngayBatDau, ngayKetThuc, trangThai } = req.body;

        try {
            const updatedKeHoach = await prisma.keHoachThuThap.update({
                where: { id: parseInt(id) },
                data: {
                    soKeHoach,
                    tieuDe,
                    nguoiTao,
                    nguoiDuyet,
                    noiDung,
                    donViNopLuu,
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

    // Delete: Xóa một kế hoạch thu thập dựa trên ID
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
}

module.exports = new LapKeHoachThuThapController();
