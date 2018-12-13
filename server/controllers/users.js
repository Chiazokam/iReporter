import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Helpers, Queries } from "../helpers";

const query = new Queries();

dotenv.load();

export class Users {
  /**
   * Represents signup user
   * @param {object} req - request body
   * @param {object} res - response body
   * @return {undefined}
   */
  createNewUsers(req, res) {
    const { username, firstname, lastname, othername, phoneNumber, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const profileimage = "https://res.cloudinary.com/shaolinmkz/image/upload/v1544370726/avatar.png";
    const userDetails = { username, firstname, lastname, othername, phoneNumber, email, hash, false: false, profileimage };

    query.createUserQuery(userDetails)
      .then((data) => {
        const user = data[0];
        const userdetails = {
          id: user.id,
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          phoneNumber: user.phonenumber,
          profileImage: user.profileimage,
          isAdmin: user.isadmin };
        const token = jwt.sign( userdetails, process.env.SECRET_KEY, { expiresIn: "1d" });
        Helpers.returnForSigninSignUp(req, res, 201, token, userdetails);
      });
  }


  /**
   * Method to login users
   * @param {object} req - body request
   * @param {object} res - body response
   * @return {undefined}
   */
  signinUser(req, res) {
    const { emailUsername, password } = req.body;
    const email = emailUsername;
    const username = emailUsername;
    query.loginQuery(email, username)
      .then(data => {
        const user = data[0];
        if (data.length > 0) {
          bcrypt.compare(password, user.password, (error, result) => {
            if (!result) {
              Helpers.returnForError(req, res, 400, "incorrect username or password");
            }	else {
              const userdetails = {
                id: user.id,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                phoneNumber: user.phonenumber,
                profileImage: user.profileimage,
                isAdmin: user.isadmin };
              const token = jwt.sign(userdetails, process.env.SECRET_KEY, { expiresIn: "1d" });
              Helpers.returnForSigninSignUp(req, res, 200, token, userdetails); }
          });
        } else {
          Helpers.returnForError(req, res, 400, "username/email or password doesn't exist"); }
      });
  }

  /**
   * Method to update users profile picture
   * @param {object} req - body request
   * @param {object} res - body response
   * @return {undefined}
   */
  updateProfileImage(req, res){
    const { profileImage } = req.body;
    const userId = req.userInfo.id;

    query.selectQuery("users", "id", userId)
      .then((data) => {
        if (data.length < 1) {
          Helpers.returnForError(req, res, 404, "user not found");
        } else if (data[0].id !== userId) {
          Helpers.returnForError(req, res, 403, "your not allowed to perform that action");
        } else {
          query.profileImageUpdateQuery(profileImage, userId)
            .then((updatedData) => {
              const updatedRecordId = updatedData[0].id;
              Helpers.returnForSuccess(req, res, 200, updatedRecordId, "profile image updated");
            });
        }
      });
  }

}





