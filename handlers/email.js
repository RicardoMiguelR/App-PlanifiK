const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const { htmlToText } = require("html-to-text");
const util = require("util");
const emailConfig = require("../config/email");

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

// Generar el Html ->
const generarHtml = (archivo, opciones = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/${archivo}.pug`,
    opciones
  );
  return juice(html);
};

exports.enviar = async (opciones) => {
  const html = generarHtml(opciones.archivo, opciones);
  const text = htmlToText(html, {
    wordwrap: 120,
  });
  let infoMensaje = {
    from: "RMUptask Gestion de proyectos <no-reply@rmuptask.com>",
    to: opciones.usuario.email,
    subject: opciones.subject,
    text,
    html,
  };

  const enviarEmail = util.promisify(transporter.sendMail, transporter);
  return enviarEmail.call(transporter, infoMensaje);
};
