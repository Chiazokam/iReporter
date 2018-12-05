import express from "express";
import { Users } from "../controllers";
import { SignUpSignInValidator } from "../middlewares";
import { Helpers } from "../helpers";
import { PostValidator } from "../middlewares";

const signUpIn = new SignUpSignInValidator();

const users = new Users();

const signupSigninRoutes = express.Router();

/**SignUp User */
signupSigninRoutes.post(
  "/auth/signup",
  signUpIn.namesValidation,
  signUpIn.multiStringValidation,
  signUpIn.inputLengthValidation,
  signUpIn.validateNumber,
  signUpIn.doesUserExist,
  users.createNewUsers
);


/**SignIn User */
signupSigninRoutes.post(
  "/auth/signin",
  signUpIn.signInValidation,
  users.signinUser
);


/**Update a user profile image*/
signupSigninRoutes.patch(
  "/users/:id/profile-image",
  Helpers.verifyUsersToken,
  PostValidator.profileImageStringValidation,
  users.updateProfileImage
);


export default signupSigninRoutes;



