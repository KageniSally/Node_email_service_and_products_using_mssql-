import { DBHelper } from "../DatabaseHelpers"
import ejs from 'ejs'
import { sendEmail } from "../Helpers";


const dbInstance = new DBHelper
export interface User {
    id: string,
    email: string,
    name: string,
    password: string,
    isDeleted: number,
    isEmailSent: number
}

export async function run() {
    try {
        let users = (await dbInstance.query("SELECT * FROM Users WHERE isEmailSent=0")).recordset as User[]
        // console.log(users);

        users.forEach(user => {
            ejs.renderFile("Templates/register.ejs", { name: user.name }, async (err, data) => {
                let messageOption = {
                    to: process.env.Email,
                    from: process.env.Email,
                    subject: "H-Store",
                    html: data
                }
                await sendEmail(messageOption)

                dbInstance.query(`UPDATE Users SET isEmailSent=1 WHERE id='${user.id}'`)
                // console.log(users)
            })
        })
    } catch (error) {

    }
}