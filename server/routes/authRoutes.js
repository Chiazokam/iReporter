import express from "express";
import { Users } from "../controllers";
import { authValidator } from "../middlewares";

const auth = new authValidator();

const users = new Users();

const authRoutes = express.Router();

/**SignUp User */
authRoutes.post(
  "/auth/signup",
  auth.namesValidation,
  auth.multiStringValidation,
  auth.inputLengthValidation,
  auth.validateNumber,
  auth.doesUserExist,
  users.createNewUsers
);


/**SignIn User */
authRoutes.post(
  "/auth/login",
  auth.signInValidation,
  users.signinUser
);



export default authRoutes;



