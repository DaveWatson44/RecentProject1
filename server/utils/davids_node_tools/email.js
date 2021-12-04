const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.gmail.com',
    port: '587',
});

const mailOptions = {
    from: 'test@pelsupply.com',
    to: ['dwatson2@pelsupply.com'],
    subject: 'TEST',
    html: 'content',
    // attachments: [
    //     {
    //         filename,
    //         content: buffer,
    //         contentType:
    //             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //     },
    // ],
};

async function sendEmail() {
    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.log(err)
    }

}



sendEmail()