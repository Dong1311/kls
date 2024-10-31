const express = require('express');

const loginRouter = require('./login');
const registerRoutes = require('./register');
const hoSoRoutes = require('./hoso');
const lapKeHoachThuThapRouter = require('./lapKeHoachThuThap');

const authenticateToken = require('../middleware/prismaAuthMiddleware');  

function route(app) {
  app.use('/api/login', loginRouter);
  app.use('/api/register', registerRoutes);
  app.use('/api/ho-so', hoSoRoutes);
  app.use('/api/lap-ke-hoach-thu-thap', lapKeHoachThuThapRouter);

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
