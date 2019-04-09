// INDEX.JS
const express = require('express')
const app = express()
const sgMail = require('@sendgrid/mail')
var nodemailer = require('nodemailer');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

app.get('/', (req, res, next) => {
  res.send('API root')
})

app.all('/notifyregister', (req, res, next) => {


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'joscri2698@gmail.com',
      pass: 'joscri2698'
    }
  });

  const mailOptions = {
    from: 'Privados VIP <joscri2698@gmail.com>',  // sender address
    to: req.body.email, // list of receivers
    replyTo: 'joscri2698@gmail.com',
    subject: 'Privados VIP', // Subject line
    html: 'Recibimos tu solicitud! Nos estaremos contactando contigo a la brevedad.'
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      res.send(err)
    else
      res.send(info)
  });

})

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
