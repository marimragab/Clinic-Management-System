const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const clinicEmail = "bright.simle.care@gmail.com";
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        "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",
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
