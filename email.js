var nodemailer = require('nodemailer');
require('dotenv').config()
var emailTemplate = require('./emailTemplate')

function sendEmail (userEmail, userMessage) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASS
    }
  });

  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: userEmail,
    subject: 'Sending Email using Node.js',
    html: emailTemplate(userEmail, userMessage)
  };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

module.exports = sendEmail