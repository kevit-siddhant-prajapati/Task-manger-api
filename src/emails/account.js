const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from : 'siddhant.prajapati@kevit.io',
        subject: 'Thanks for joining us!',
        text : `Welcome to the app, ${name}.Let me know how you get along with the app.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from : 'siddhant.prajapati@kevit.io',
        subject : 'GoodBye User',
        text : `GoodBye ${name}, please give the feedback for improvement in us!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}