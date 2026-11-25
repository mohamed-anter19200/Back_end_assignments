import nodemailer from "nodemailer";
import {nodemailer_host, nodemailer_pass, nodemailer_port, nodemailer_user} from "../../../config/config.js";
const transporter = nodemailer.createTransport({
    host: nodemailer_host,
    port:  nodemailer_port,
    secure: false,
    auth: {
        user:   nodemailer_user,
        pass:  nodemailer_pass,
    },
});

 export async function sendEmail(to, subject, html) {
     await transporter.sendMail({
         from: '"Saraha App" <mohamedanter192004@gmail.com>',
         to: to,
         subject: subject,
         html:  html,
     });
 }