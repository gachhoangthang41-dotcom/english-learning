import nodemailer from "nodemailer";

const host = process.env.MAIL_HOST || "smtp.gmail.com";
const port = Number(process.env.MAIL_PORT || 465);
const secure = String(process.env.MAIL_SECURE || "true") === "true";

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
});

export async function sendEmail(to: string, subject: string, html: string) {
  const fromName = process.env.MAIL_FROM_NAME || "Web Học Tiếng Anh";
  const fromEmail = process.env.MAIL_FROM_EMAIL || user;

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html,
  });
}
