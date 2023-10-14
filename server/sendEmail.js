const nodemailer = require('nodemailer');
const {google} = require('googleapis')

const CLIENT_ID = '653472338947-bfuhorer13ntu3aqqe0l9mhis5f3cl32.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04IMffhylKqMaCgYIARAAGAQSNwF-L9Irl37GRScCQNQ6sbsvkZfma2PLGCLEKHIqTX9DSiHbCynmztNqszdZ22j7Mudz22JdIlE'


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

async function sendMail(emailContent) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'rali9924@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'rali9924 <rali9924@gmail.com>',
        to: 'rali9924@gmail.com',
        subject: 'SERVICES',
        text: emailContent,
      };
  
      // Use await to wait for the email to be sent
      const result = await transport.sendMail(mailOptions);
      console.log('EMAIL HAS BEEN SENT...', result);
      return result;
    } catch (error) {
      console.error('Email sending error:', error);
      throw error; // Re-throw the error for handling in the calling code
    }
  }
  
  module.exports = { sendMail };

sendMail().then(result=> console.log('EMAIL HAS SEND... ', result))
.catch((error) => console.log(error.message));