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


    // Split candidates emails by comma, trim whitespace, and filter out empty strings
    const candidateEmails = candidates
      .split(',')
      .map(email => email.trim())
      .filter(email => email !== '');

    // Ensure there are valid emails to send
    if (candidateEmails.length === 0) {
      return res.status(400).json({ message: 'No valid candidates provided.' });
    }

    // Send emails to all candidates
    for (const candidateEmail of candidateEmails) {
      // Log candidate email for debugging
      console.log(`Sending email to: ${candidateEmail}`);

      // Check if the candidateEmail is a valid email format (simple regex validation)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(candidateEmail)) {
        console.error(`Invalid email address: ${candidateEmail}`);
        continue; // Skip this iteration if the email is invalid
      }

      try {
        await sendJobEmail(candidateEmail, job);
      } catch (emailError) {
        console.error(`Failed to send email to ${candidateEmail}:`, emailError);
      }
    }

    res.redirect('/api/jobs');
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
