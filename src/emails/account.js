const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

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