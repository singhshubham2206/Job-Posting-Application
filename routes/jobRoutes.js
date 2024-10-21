// routes/jobRoutes.js
// const express = require('express');
// const { createJob } = require('../controllers/jobController');
// const { authenticate } = require('../middleware/authMiddleware');

// const router = express.Router();

// // Route for creating a job
// router.post('/', authenticate, createJob);

// module.exports = router;


const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticate } = require('../middleware/authMiddleware');
const Job = require('../models/Job'); 

// Render job form 
router.get('/post', (req, res) => {
    res.render('jobForm'); 
});

router.post('/', authenticate, jobController.createJob);


// Render Job List
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find(); // Fetch all jobs from the database
        res.render('jobList', { jobs }); // Pass jobs to the job list view
    } catch (error) {
        res.status(500).send('Error fetching job list');
    }
});




module.exports = router;
