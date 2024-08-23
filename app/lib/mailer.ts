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
      html: `<h1>Hi ${username}</h1> \n  Welcome to CodeFlexFlow! Registration Succesfull, This is deveopment email. Please Report any BUGS to the developer <b>[m4tryxxx@gmail.com]</b> . Thank you.`, // html body
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
      html: `<h1>Hi ${username}</h1>\n  &nbsp; &nbsp; &nbsp; Someone requested a password reset link, if this was not you we recommend you to change your password as soon as possible and ignore this email, otherwise to reset your password please click on the button below! \n \n  <a href="https://codeflexflow.vercel.app/recovery/${token}" style="text-decoration: none; color: white;"><h2 style="padding: 5px 8px; width: 70%; background-color: darkblue; color: white; border-radius: 8px; text-decoration: none; text-align: center; margin: 5px auto;">Change Password</h2></a> \n  &nbsp; If you dont see the button copy this link and paste it into your browser: \n <b>https://codeflexflow.vercel.app/recovery/${token}</b> \n \n Please note the link will expire after 30 minutes. Thank you. \n <br> &nbsp; &nbsp; Your username is: <b>${username}</b>`, // html body
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
