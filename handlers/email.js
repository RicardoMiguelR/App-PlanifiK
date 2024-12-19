const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const util = require("util");
const emailConfig = require("../config/email");
const email = require("../config/email");

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

// const message = {
//     from: "RMUptask <no-reply@rmuptask.com>",
//     to: "correo@correo.com",
//     subject: "Password Reset",
//     text: "Hola",
//     html: "<p>hola</p>",
// };

// transporter.sendMail(message)

async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "RMUptask <no-reply@rmuptask.com>",
    to: "cr7@correo.com",
    subject: "Password Reset ✔",
    text: "Hola",
    html: "<b>Que transa</b>",
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
