const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'techweb.meanoto@gmail.com',
    pass: 'techweb2021'
  },
  tls: {
    rejectUnauthorized: false,
  }
});

  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: 'techweb.meanoto@gmail.com', // sender address
  //   to: "camilov.projects@gmail.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

exports.transport = transport;
