// controllers/jobController.js
const Job = require('../models/Job');
const { sendJobEmail } = require('../emailService'); // Import the email service

// POST /api/jobs/post
exports.createJob = async (req, res) => {
  try {
    const { title, description, experienceLevel, candidates, endDate } = req.body;

    const job = new Job({
      title,
      description,
      experienceLevel,
      candidates,
      endDate,
      companyId: req.user.id,  // Get the authenticated user's ID
    });

    await job.save();

    console.log(candidates)  // check candidates

    // Send emails to all candidates
    for (const candidateEmail of candidates) {
      await sendJobEmail(candidateEmail, job);
    }

    res.redirect('/api/jobs');
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
