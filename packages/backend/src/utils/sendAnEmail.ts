const nodemailer = require('nodemailer');

export default async function sendAnEmail(to: string, text: string): Promise<void> {
    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, 
        auth: {
            user: process.env.Email_USER,
            pass: process.env.Email_PASS,
        },
    });
    console.log('SMTP_HOST:', process.env.SMTP_HOST);

    await transporter.sendMail({
        from: process.env.Email_USER,
        to: to, 
        subject: 'קוד אימות',
        text: text,
    });
}