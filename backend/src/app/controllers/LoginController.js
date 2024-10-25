const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class LoginController {
    login = async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { username },
            });

            if (!user) {
                return res.status(404).json({ message: 'User không tồn tại' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Sai mật khẩu' });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role, name: user.name }, 
                process.env.JWT_SECRET,  
                { expiresIn: '7w' }
            );

            // Trả về token
            return res.status(200).json({ token, message: 'Đăng nhập thành công' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    };
}

module.exports = new LoginController();
