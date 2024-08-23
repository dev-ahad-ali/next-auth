import { User } from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '6582774b8c5d1a', // .env
        pass: 'd76d574fe0039e', // .env
      },
    });

    const mailOptions = {
      from: 'ahad@gmail.com', // sender address
      to: email, // list of receivers
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password', // Subject line
      //   text: 'Hello world?', // plain text body
      html: `<a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to
       ${emailType === 'VERIFY' ? 'verify your email' : ' reset your password'}
      or copy and paste the link below in your browser.
      <br>
      ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
