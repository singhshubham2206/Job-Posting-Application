const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobRoutes');
const path = require('path');
const cookieParser = require("cookie-parser");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

const app = express();
app.use(bodyParser.json());
app.use(cookieParser()); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);


// Render EJS views
app.get('/', (req, res) => {
    res.render('index'); 
  });
  

// MongoDB connection
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
