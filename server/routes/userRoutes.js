import express from "express";
import { Users } from "../controllers";
import { SignUpSignInValidator } from "../middlewares";

const signUpIn = new SignUpSignInValidator();

const users = new Users();

const userRoutes = express.Router();

/**SignUp User */
userRoutes.post("/auth/signup", signUpIn.namesValidation, signUpIn.multiStringValidation, signUpIn.validateNumber, signUpIn.doesUserExist, users.createNewUsers);
userRoutes.post("/auth/signin", signUpIn.signInValidation, users.signinUser);



export default userRoutes;


