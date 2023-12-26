const nodeMailer = require('nodemailer');

const emailer = async(option)=> {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.USER_PASSWORD,
            },
        });
        await transporter.sendMail(option);
        console.log('Email Sent')
    } catch (err) {
        console.log(err.message);
    }
}
module.exports = emailer;