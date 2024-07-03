const nodemailer = require('nodemailer');


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b9e0e49a54890e",
      pass: "bbce960f8f0d4b"
    }
  });


module.exports = transport;