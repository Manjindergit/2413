const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'your.email@gmail.com', // generated ethereal user
        pass: 'your.password' // generated ethereal password
    }
});

// send mail with defined transport object
let info = await transporter.sendMail({
    from: 'your.email@gmail.com', // sender address
    to: 'recipient.email@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
});

console.log('Message sent: %s', info.messageId);
