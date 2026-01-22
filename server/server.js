const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hotwheels';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Database Connection
let isDbConnected = false;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        isDbConnected = true;
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('⚠️  Running in MOCK DATA mode (In-memory only)');
    });

// Make connection status available
app.locals.isDbConnected = () => isDbConnected;

// Basic Route for testing
app.get('/', (req, res) => {
    res.send(`Hot Wheels API is running... DB Connected: ${isDbConnected}`);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
