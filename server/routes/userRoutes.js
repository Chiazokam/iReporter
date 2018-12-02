import express from "express";
import { Users } from "../controllers";
import { SignUpSignInValidator } from "../middlewares";
import { Helpers } from "../helpers";
import { PostValidator } from "../middlewares";

const signUpIn = new SignUpSignInValidator();

const users = new Users();

const userRoutes = express.Router();

/**SignUp User */
userRoutes.post("/auth/signup", signUpIn.namesValidation, signUpIn.multiStringValidation, signUpIn.validateNumber, signUpIn.doesUserExist, users.createNewUsers);

/**SignIn User */
userRoutes.post("/auth/signin", signUpIn.signInValidation, users.signinUser);

/**Update a user profile image*/
userRoutes.patch("/users/:id/profile-image", Helpers.verifyUsersToken, PostValidator.profileImageStringValidation, users.updateProfileImage);


export default userRoutes;



