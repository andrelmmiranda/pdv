const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function send(destinatario, assunto, corpo) {
    const info = transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: destinatario,
        subject: assunto,
        html: corpo
    });

}

module.exports = {
    send
}
