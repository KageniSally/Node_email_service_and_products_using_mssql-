import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, "../../.env") })
import ejs from 'ejs'


//Create a configuration object
let config = {
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
}

//Create a transporter
function createTransporter(config: any) {
    return nodemailer.createTransport(config)
}


//Send Email
async function sendEmail(messageOption: any) {
    let transporter = createTransporter(config)
    await transporter.verify()
    await transporter.sendMail(messageOption, (err, info) => {
        if (err) {
            console.log(err)
        } console.log(info);

    })
}





ejs.renderFile("../../Templates/register.ejs", { name: 'Sally' }, (err, data) => {
    let messageOption = {
        to: process.env.Email,
        from: process.env.Email,
        subject: "H-Store",
        html: data
    }
    sendEmail(messageOption)
})