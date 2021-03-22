const nodemailer = require('nodemailer');
const pug = require('pug');

const sendMail = async (options) => {
  try {
    const html = pug.renderFile(`${__dirname}/../templates/passwordreset.pug`, {
      passwordResetOTP: options.passwordResetOTP,
    });

    // 1. Create Transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '7c14a04c745095',
        pass: '0a6348667ef5c1',
      },
    });

    // 2. Define Email Action
    const mailOptions = {
      from: 'Peripherals',
      to: options.email,
      subject: options.subject,
      html,
      text: options.message,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log({ error });
  }
};

module.exports = sendMail;
