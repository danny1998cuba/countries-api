const nodeMail = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config();

async function mainMail(name, email, subject, message) {
    const transporter = await nodeMail.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.PASSWORD,
        },
    });

    const mailOption = {
        from: process.env.GMAIL_USER,
        to: process.env.EMAIL,
        subject: subject,
        html: `You got a message from <br>
      Email : ${email}<br>
      Name: ${name}<br>
      Message: <p>${message}</p>`,
    };
    try {
        await transporter.sendMail(mailOption);
        return Promise.resolve("Message Sent Successfully!");
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = mainMail