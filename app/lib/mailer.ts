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
        throw error;
      } else {
        //console.log("Email sent: " + info.response);
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
        throw error;
      } else {
        //console.log("Email sent: " + info.response);
      }
    }
  );
};

export const sendInvitationEmail = async (
  email: String,
  invitation: {} | any,
  user: {} | any
) => {
  const info = await transporter.sendMail(
    {
      from: "CodeFlexFlow@gmail.com", // sender address
      to: email, // list of receivers
      subject: `${user.personal_info.first_name} ${user.personal_info.last_name} CV`, // Subject line
      text: "My Cv Link", // plain text body
      html: `<h1>Hi</h1>\n  &nbsp; &nbsp; &nbsp; My name is ${user.personal_info.first_name} ${user.personal_info.last_name} and i would like to work for you, please see my CV by clicking the button below! \n \n  <a href="https://codeflexflow.vercel.app/cv/${invitation.id}" style="text-decoration: none; color: white;"><h2 style="padding: 5px 8px; width: 70%; background-color: darkblue; color: white; border-radius: 8px; text-decoration: none; text-align: center; margin: 5px auto;">View My Cv</h2></a> \n  &nbsp; If you don't see the button please copy this link and paste it into your browser: \n <b>https://codeflexflow.vercel.app/cv/${invitation.id}</b> \n \n This Cv was sent for ${invitation.at_company_name} Please note the link is valid for 7 days. Thank you. \n\n<br> &nbsp; &nbsp;&nbsp; &nbsp; Kind Regards ${user.personal_info.first_name} ${user.personal_info.last_name}!`, // html body
    },
    function (error: any, info: any) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        //("Email sent: " + info.response);
        //console.log(info);
      }
    }
  );
};

export const sendContactMeEmail = async (
  email: any,
  name: any,
  message: any
) => {
  if (!email) {
    email = "No Email Provided";
  }
  const info = await transporter.sendMail(
    {
      from: "CodeFlexFlow@gmail.com", // sender address
      to: "m4tryxxx@gmail.com", // list of receivers
      subject: "You have a new message!", // Subject line
      text: `New message from ${name} - ${email}!`, // plain text body
      html: `<b> <h3>New message from ${name} - ${email}!</h3></b>  <p>  </p> <p>  ${message}</p>`, // html body
    },
    function (error: any, info: any) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        //console.log("Email sent: " + info.response);
        return info;
      }
    }
  );
};

export async function sendNotificationEmail(
  email: string,
  name: string,
  message: string,
  link: string
) {
  const info = await transporter.sendMail(
    {
      from: "CodeFlexFlow@gmail.com", // sender address
      to: email, // list of receivers
      subject: "CodeFlexFlow Notification", // Subject line
      text: "Notification", // plain text body
      html: `<h1>Hi ${name}</h1>\n  &nbsp; &nbsp; &nbsp; ${message} \n \n  <a href="${link}" style="text-decoration: none; color: white;"><h2 style="padding: 5px 8px; width: 70%; background-color: darkblue; color: white; border-radius: 8px; text-decoration: none; text-align: center; margin: 5px auto;">View Message</h2></a> \n  &nbsp; If you dont see the button copy this link and paste it into your browser: \n <b>${link}</b> \n \n Thank you.`, // html body
    },
    function (error: any, info: any) {
      if (error) {
        console.log(error);
        throw error;
      } else {
        //console.log("Email sent: " + info.response);
        return info;
      }
    }
  );
}
