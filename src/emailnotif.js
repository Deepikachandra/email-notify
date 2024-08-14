const {SESClient, SendEmailCommand} = require("@aws-sdk/client-ses");
require("dotenv").config();

const SES_CONFIG = {
    credentials: {
        accessKeyId : process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_SES_REGION
};

// create ses service object
const sesClient = new SESClient(SES_CONFIG);

  const sendEmail = async (recipientEmail, name) => {

    let params = {
        Source: process.env.AWS_SES_SENDER,
        Destination: {
          ToAddresses: [recipientEmail] // Email address/addresses that you want to send your email
        },
        ReplyToAddresses: [],
        Message: {
          Body: {
            Html: {
              // HTML Format of the email
              Charset: "UTF-8",
              Data:
                "<h1>hello</h1>"
            },
            Text: {
              Charset: "UTF-8",
              Data: `hello ${name}`
            }
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Test email"
          }
        }
      };

      try{
        const sendEmailCommand = new SendEmailCommand(params);
        const res = await sesClient.send(sendEmailCommand);
        console.log("email sent");
      } catch(error){
        console.log(error);
      }
  }

  sendEmail("deepikanitraipur@gmail.com", "deepika");

