import jwt from "jsonwebtoken";
import { Helpers } from "../helpers";


/**
  * Token verification for Users
  * @param {object} req - The request body
  * @param {object} res - The response body
  * @param {object} next - calls the next middleware
  * @return {undefined}
  */
const verifyUsersToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {

    req.token = bearerHeader;

    jwt.verify(req.token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        Helpers.returnForError(req, res, 401, "Invalid Token");
      } else {
        req.userInfo = decodedToken;
        next();
      }
    });
  } else {
    Helpers.returnForError(req, res, 401, "Token not provided");
  }
};

export default verifyUsersToken;
