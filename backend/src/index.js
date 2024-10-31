const express = require('express');
const path = require('path');
const app = express();
const route = require('./routes');
const session = require('express-session');
const methodOverride = require('method-override');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(cors());

// Phục vụ các file tĩnh từ thư mục "src/file/tailieuhuongdan"
app.use('/file/tailieuhuongdan', express.static(path.join(__dirname, '../../src/file/tailieuhuongdan')));

app.use(
  session({
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

route(app);

app.post('/post', (req, res) => {
  console.log('Connected to React');
  res.redirect('/');
});
app.get('/', (req, res) => {
    return "API running successfully"
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
