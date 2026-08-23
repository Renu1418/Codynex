import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import contactRoute from './routes/contact.js';
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Static files and frontend route
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