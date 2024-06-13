import { Response, Request } from 'express';
import { v4 as uid } from 'uuid'
import { RegisterSchema } from '../Helpers';
import Bcrypt from 'bcrypt'
import { sqlConfig } from '../config';
import mssql from 'mssql'
import { Payload, User } from '../Models/modelUser';
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { DBHelper } from '../DatabaseHelpers';
dotenv.config({ path: path.resolve(__dirname, "../../.env") })


const dbInstance = new DBHelper
export const registeredUser = async (req: Request, res: Response) => {
    try {
        //id
        const id = uid()

        const { name, email, password } = req.body
        const { error } = RegisterSchema.validate(req.body)

        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        //If no error proceed to hash the password
        const HashedPassword = await Bcrypt.hash(password, 10)

        dbInstance.exec('addUser', { id, name, email, password: HashedPassword })




        return res.status(201).json({ message: 'User Added Successfully' })

    } catch (error) {
        return res.status(500).json(error)
    }

}


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
      

const user=(await dbInstance.exec('getUser',{email:email})).recordset as User[]



        if (user.length !== 0) {
            const isValid = await Bcrypt.compare(password, user[0].password)

            if (isValid) {
                const payload: Payload = {
                    sub: user[0].id,
                    name: user[0].name
                }
                const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '2h' })


                return res.status(200).json({ message: 'Login sucessful!!!!!!!', token })
            }

        }
        return res.status(400).json({ message: 'Incorrect credentials' })
    } catch (error) {
        return res.status(500).json(error)
    }
}


