const nodemailer = require("nodemailer");

const sendEmailResetPassword = async (email, otp, user) => {
  try {
    const body = `Hi ${user}.\nPlease use the following OTP to reset your password. \nOTP is valid for 10 minutes.\n ${otp}\nIf you didn't request this, you can ignore this email or let us know.`;
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 465,
      //secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "OTP for Reset Password",
      text: body,
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
        user: process.env.USER_EMAIL,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
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
