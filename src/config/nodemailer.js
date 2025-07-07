import nodemailer from "nodemailer";
import { USER_MAIL, USER_PASS } from "./env.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_MAIL,
    pass: USER_PASS,
  },
});

const sendMailWrapperFunction = async (mailConfig) => {
  const { receiver, subject, htmlContent } = mailConfig;
  await transporter.sendMail({
    from: USER_MAIL,
    to: receiver,
    subject: subject,
    html: htmlContent,
  });
};

export default sendMailWrapperFunction;
