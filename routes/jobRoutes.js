// routes/jobRoutes.js
const express = require('express');
const { createJob } = require('../controllers/jobController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for creating a job
router.post('/', authenticate, createJob);

module.exports = router;
