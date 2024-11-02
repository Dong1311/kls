const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CanBoController {
    // Lấy chi tiết cán bộ theo maCanBo
    async getCanBoDetail(req, res) {
        const { maCanBo } = req.params;
        try {
            const canBo = await prisma.canBo.findUnique({
                where: { id: parseInt(maCanBo, 10) },  
                select: { tenCanBo: true }            
            });

            if (!canBo) {
                return res.status(404).json({ message: 'Không tìm thấy cán bộ' });
            }

            res.status(200).json(canBo);
        } catch (error) {
            console.error('Error fetching CanBo details:', error);
            res.status(500).json({ message: 'Lỗi khi lấy chi tiết cán bộ', error: error.message });
        }
    }
}

module.exports = new CanBoController();
