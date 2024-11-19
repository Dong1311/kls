const express = require('express');

const loginRouter = require('./login');
const registerRouter = require('./register');
const lapKeHoachThuThapRouter = require('./lapKeHoachThuThap');
const hoSoRouter = require('./hoso');
const taiLieuRouter = require('./tailieu');
const canBoRoter = require('./canbo');
const bienBanBanGiaoRouter = require('./bienBanBanGiao');
const phongBanRouter = require('./phongban');
const userRouter = require('./user');
const hopCapRouter = require("./hopcap");
const cTPhieuYCRouter = require('./ctphieuyc');
const phieuTrackRouter = require('./phieutra');
const authenticateToken = require('../middleware/prismaAuthMiddleware');  

function route(app) {
  app.use('/api/login', loginRouter);
  app.use('/api/register', registerRouter);
  app.use('/api/ho-so', hoSoRouter);
  app.use('/api/lap-ke-hoach-thu-thap', lapKeHoachThuThapRouter);
  app.use('/api/tai-lieu',taiLieuRouter);
  app.use('/api/can-bo', canBoRoter);
  app.use('/api/bien-ban-ban-giao', bienBanBanGiaoRouter);
  app.use('/api/phong-ban', phongBanRouter);
  app.use('/api/users', userRouter);
  app.use("/api/hop-cap", hopCapRouter);
  app.use("/api/ctphieuyc", cTPhieuYCRouter);
  app.use("/api/phieu-tra", phieuTrackRouter);
  app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({
      message: 'This is a protected route. You are authenticated.',
      user: req.user,
    });
  });

  app.get('/api', (req, res) => {
    res.send('API is running...');
  });
}

module.exports = route;
