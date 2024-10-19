// const nodemailer = require('nodemailer');

// Create an Ethereal test account
// nodemailer.createTestAccount((err, account) => { 
//   if (err) {
//     console.error('Failed to create a testing account', err);
//     return;
//   }

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: account.user, // Generated Ethereal user
//       pass: account.pass, // Generated Ethereal password
//     },
//   });

//   const sendJobEmail = async (candidateEmail, jobDetails) => {
//     const mailOptions = {
//       from: account.user,
//       to: candidateEmail,
//       subject: `New Job Posting: ${jobDetails.title}`,
//       text: `
//         Hi,

//         A new job has been posted that may interest you:

//         Job Title: ${jobDetails.title}
//         Description: ${jobDetails.description}
//         Experience Level: ${jobDetails.experienceLevel}
//         Apply before: ${jobDetails.endDate}

//         Best regards,
//         Your Company Name
//       `,
//     };

//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log(`Email sent to ${candidateEmail}: ${nodemailer.getTestMessageUrl(info)}`);
//     } catch (error) {
//       console.error(`Error sending email to ${candidateEmail}:`, error);
//     }
//   };

//   module.exports = { sendJobEmail };
// });





// Ethereal Account:
// Name	Nathanael Becker
// Username	nathanael.becker@ethereal.email
// Password	ybWs82W21s3z1YerRt

const nodemailer = require('nodemailer');

// Create transporter directly with Ethereal credentials
const transporter = nodemailer.createTransport({ 
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'nathanael.becker@ethereal.email', // Replace with your Ethereal user
    pass: 'ybWs82W21s3z1YerRt', // Replace with your Ethereal password
  },
});

const sendJobEmail = async (candidateEmail, jobDetails) => {
  const mailOptions = {
    from: 'nathanael.becker@ethereal.email', // Replace with your Ethereal email
    to: candidateEmail,
    subject: `New Job Posting: ${jobDetails.title}`,
    text: `
      Hi,

      A new job has been posted that may interest you:

      Job Title: ${jobDetails.title}
      Description: ${jobDetails.description}
      Experience Level: ${jobDetails.experienceLevel}
      Apply before: ${jobDetails.endDate}

      Best regards,
      Your Company Name
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${candidateEmail}: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    console.error(`Error sending email to ${candidateEmail}:`, error);
  }
};

module.exports = { sendJobEmail };
