const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env["EMAIL_ID"],
    pass: process.env["EMAIL_PASSWORD"],
  },
});

export const sendWelcomeEmail = async (email: string, username: string) => {
  const info = await transporter.sendMail(
    {
      from: "CodeFlexFlow@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Welcome", // plain text body
      html: `<h1>Hi ${username}</h1> \n  Welcome to CodeFlexFlow! This is a deveopment email. Please Report any BUGS to the developer <b>[m4tryxxx@gmail.com]</b> . Thank you.`, // html body
    },
    function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

export const sendResetPasswordEmail = async (
  email: string,
  token: string,
  username: string
) => {
  const info = await transporter.sendMail(
    {
      from: "CodeFlexFlow@gmail.com", // sender address
      to: email, // list of receivers
      subject: "CodeFlexFlow Password Reset Link", // Subject line
      text: "Password Reset Link", // plain text body
      html: `<h1>Hi ${username}</h1>\n   Someone requested a password reset link, if this was not you we recommend you to change your password as soon as possible and ignore this email, otherwise to reset your password please click <b> https://m4code.vercel.app/recovery/${token} </b>. Please note the link will expire after 30 minutes. Thank you. \n  Your username is: <b>${username}</b>`, // html body
    },
    function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
