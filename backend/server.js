const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const loginSchema = require("./zod/userClearance");
const aadhaarStatusSchema = require("./zod/adharClearance");
const authRoutes = require('./routes/authRoute');
const { verifyToken, authorizeRoles } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Server is working!');
});
// Routes
app.use('/api/auth', authRoutes);


app.get('/dashboard', verifyToken, authorizeRoles('admin', 'distributor', 'retailer'), (req, res) => {
  res.json({ message: `Welcome, ${req.user.role}!` });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
