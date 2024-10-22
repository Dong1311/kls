const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

class RegisterController {
    register = async (req, res) => {
        const { username, password, role } = req.body;

        try {
            // Kiểm tra xem username đã tồn tại chưa
            const existingUser = await prisma.user.findUnique({
                where: { username },
            });

            if (existingUser) {
                return res.status(400).json({ message: 'User đã tồn tại' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    role,
                },
            });

            res.status(201).json({ message: 'Đăng ký thành công', newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    };
}

module.exports = new RegisterController();
