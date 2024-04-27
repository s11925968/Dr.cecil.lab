import nodemailer from "nodemailer";
export async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_SENDER,
      pass: process.env.PASS_SENDER,
    },
  });

  const info = await transporter.sendMail({
    from: `"DR.CECIL " <${process.env.EMAIL_SENDER}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
  return info;
}