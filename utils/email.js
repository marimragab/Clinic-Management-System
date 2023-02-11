const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const clinicEmail = process.env.CLINIC_EMAIL;
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_KEY,
    },
  })
);

exports.sendEmail = async (email, subject, emailBody) => {
  const data = await transporter.sendMail({
    to: email,
    from: clinicEmail,
    subject,
    html: emailBody,
  });
  return console.log(data);
};
