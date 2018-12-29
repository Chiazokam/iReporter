import nodemailer from "nodemailer";
import { Queries } from "../helpers/queries";

const query = new Queries();

const sendEmail = (req, res) => {
  const createdby = req.createdby;
  const status = req.status;
  const title = req.title;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  query.selectQuery("users", "id", createdby)
    .then(data => {
      const userEmail = data[0].email;
      const fullname = `${data[0].firstname}, ${data[0].lastname}`;
      const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: "INCIDENT STATUS UPDATE",
        html: `
        <p>Hello ${fullname}.</p>
        <h2>Your report status with title, "${title}" have been updated</h2>
        <p>It has been changed to <strong>${status.toUpperCase()}</strong></p>
        <p>Click <a href="eye-reporter.herokuapp.com">here</a> to login to iReporter.</p>


        <p><b>kind regards,</b></p>
        <p><i>ADMIN</i></p>`
      };

      transporter.sendMail(mailOptions);
    });
};

export default sendEmail;
