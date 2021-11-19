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
exports.transport = transport;
