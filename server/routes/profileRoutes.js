import express from "express";
import { Users } from "../controllers";
import { PostValidator, verifyUsersToken } from "../middlewares";


const users = new Users();

const profileRoutes = express.Router();


/**Update a user profile image*/
profileRoutes.patch(
  "/users/profile-image",
  verifyUsersToken,
  PostValidator.profileImageStringValidation,
  users.updateProfileImage
);


export default profileRoutes;



