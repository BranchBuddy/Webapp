// import nodemailer from 'nodemailer';
// import environment from './environment';
// import logger from './logger';
//
// const transport = nodemailer.createTransport({
//   host: environment.SMTP_HOST,
//   port: environment.SMTP_PORT,
//   auth: {
//     user: environment.SMTP_USER,
//     pass: environment.SMTP_PASSWORD,
//   },
// });
//
// transport.verify((error: any, success: any) => {
//   if (error) {
//     logger.error(error);
//   } else {
//     logger.info('Server is ready to take our messages');
//   }
// });
// export const sendMail = async (
//   email: string,
//   subject: string,
//   text: string,
//   html?: string,
// ) => {
//   const mailOptions = {
//     from: environment.FROM_EMAIL,
//     to: email,
//     subject: subject,
//     text: text,
//     html: html,
//   };
//
//   transport.sendMail(mailOptions, (error: any, info: any) => {
//     if (error) {
//       logger.error(`Error sending mail to ${mailOptions.to}`);
//       logger.error(error);
//       logger.error(info);
//     }
//     logger.debug(`Email sent to ${mailOptions.to}`);
//     logger.info(`Message sent: ${info.response}`);
//   });
// };
