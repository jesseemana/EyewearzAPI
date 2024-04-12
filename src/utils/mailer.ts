// import sgMail from '@sendgrid/mail'

// sgMail.setApiKey(String(process.env.SEND_GRID_API_KEY))

export const sendEmail = async (message: Object) => {
  try {
    // const response = await sgMail.send(message)
    // console.log(response)
  } catch (error: any) {
    console.log(`Error sending email: ${error.message}.`);
  }
}
