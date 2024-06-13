import { Request, Response, NextFunction } from "express";
import { Payload } from "../Models/modelUser";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, "../../.env") })




export interface ExtendedRequest1 extends Request {
    info?: Payload
}



export function verifyToken(req: ExtendedRequest1, res: Response, next: NextFunction) {
    try {
        const token = req.headers['token'] as string

        //check if there is a token
        if (!token) {
            return res.status(401).json({ message: "Forbidden" })
        }
        const decodeData = jwt.verify(token, process.env.SECRET as string)  as Payload
        req.info = decodeData
    } catch (error) {
        return res.status(500).json(error)
    }
    next()

}
