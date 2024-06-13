import { Router } from "express";
import { loginUser, registeredUser } from "../Controllers/authController";

const authRouter=Router()
authRouter.post('/register',registeredUser)
authRouter.post('/login',loginUser)


export default authRouter