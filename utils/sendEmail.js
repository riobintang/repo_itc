const nodemailer = require("nodemailer");

const sendEmailResetPassword = async (email, subject, text, userReset) => {
  try {
    const newText = `Hi ${userReset.fullName}.\nYou requested a password reset. \nTo reset your password, click this link: \n${text} \nIf you don't use this link within 1 hour, it will expire.`;
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: newText,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "email not sent");
    throw new Error(error);
  }
};

async function sendEmailVerify(user) {
  try {
    const subject = "Welcome to ITC";
    const newText = `Hi ${user.fullName}.\nYou has been verified.\nNow you can log in and learn something new. `;
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: user.email,
      subject: subject,
      text: newText,
    });
  } catch (error) {
    console.log(error, "email not sent");
    throw new Error(error);
  }
}

module.exports = {sendEmailResetPassword, sendEmailVerify};
