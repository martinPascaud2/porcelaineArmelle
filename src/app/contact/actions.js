"use server";

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export async function sendMail(prevState, formData) {
  const mail = formData.get("mail");
  const subject = formData.get("subject");
  const message = formData.get("message");

  if (!validateEmail(mail)) {
    return {
      status: 400,
      message: "Votre adresse mail semble être incorrecte.",
    };
  }

  try {
    await transporter.sendMail({
      from: mail,
      to: process.env.GMAIL_USER,
      replyTo: mail,
      subject: subject,
      text: message,
      html: message,
    });
  } catch (error) {
    return {
      status: 424,
      message: "Une erreur s'est produite ; votre message n'a pas été envoyé.",
    };
  }

  return { status: 200, message: "Message envoyé !" };
}
