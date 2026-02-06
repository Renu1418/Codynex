const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoute = require('./routes/contact');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/contact', contactRoute);
app.use('/api/auth', authRoutes);

// current server.js (backend folder me)
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


// Server Listener
console.log('MONGO_URI:', process.env.MONGO_URI ? '✅' : '❌');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅' : '❌');
console.log('PORT:', PORT);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
