//For sending emails
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transport = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}));

module.exports = transport;
