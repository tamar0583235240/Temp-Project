import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetEmail(email: string, token: string) {
  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
  const mailOptions = {
    from: `"DiversiTech LingoPrep" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'איפוס סיסמה',
    text: `להלן הקישור לאיפוס הסיסמה שלך: ${resetUrl}`,
    html: `<p>להלן הקישור לאיפוס הסיסמה שלך:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  };

  await transporter.sendMail(mailOptions);
}
