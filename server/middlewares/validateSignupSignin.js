import { Helpers } from "../helpers";
import { db } from "../database";



export class SignUpSignInValidator {
  /**
   * Validates users input for signup and signin
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route.
   * @return {undefined}
   */
  multiStringValidation(req, res, next) {
    const { username, firstname, lastname, phoneNumber, email, password, confirmPassword } = req.body;
    const reqObject = { username, firstname, lastname, phoneNumber, email, password };
    const reqObject2 = { username, phoneNumber, email };
    let inputs;
    for (inputs in reqObject) {
      if (!reqObject[inputs]) {
        return Helpers.returnForError(req, res, 400, `${inputs} is required`);
      }
      if (!(/[^\s+]/g.test(reqObject[inputs]))) {
        return Helpers.returnForError(req, res, 400, `${inputs} is required`); }
    }

    for (inputs in reqObject2) {
      if (Helpers.nowhiteSpace(reqObject2[inputs])) {
        return Helpers.returnForError(req, res, 400, `remove white-space from ${inputs}`); }
    }

    if (Helpers.isValidEmail(email) !== true) {
      return Helpers.returnForError(req, res, 400, "invalid email");
    } else if (password !== confirmPassword) {
      return Helpers.returnForError(req, res, 400, "password didn't match"); }
    next();
  }


  /**
   * Validates the length of input characters
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route.
   * @return {undefined}
   */
  inputLengthValidation(req, res, next) {
    const { username, firstname, lastname, phoneNumber, password } = req.body;

    if (username.lastIndexOf("") < 2) {
      return Helpers.returnForError(req, res, 400, "username length should be above 2");
    } else if (firstname.lastIndexOf("") < 2 ) {
      return Helpers.returnForError(req, res, 400, "firstname length should be above 2");
    } else if (lastname.lastIndexOf("") < 2) {
      return Helpers.returnForError(req, res, 400, "lastname length should be above 2");
    } else if (phoneNumber.lastIndexOf("") !== 11) {
      return Helpers.returnForError(req, res, 400, "phone number should be 11 characters");
    } else if (password.lastIndexOf("") < 6 || password.lastIndexOf("") > 20) {
      return Helpers.returnForError(req, res, 400, "password length should be between 6 and 20");
    }
    next();
  }



  /**
   * Validates users othername for signup
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
  namesValidation(req, res, next) {
    const { username, firstname, lastname, phoneNumber, email, password, othername } = req.body;
    const userFullname = { firstname, lastname };
    const reqArray = { username, firstname, lastname, phoneNumber, email, password };
    let inputs;
    for (inputs in reqArray) {
      if (Helpers.isNotString(reqArray[inputs])) {
        return Helpers.returnForError(req, res, 400, `invalid input ${inputs}`);
      }
    }

    for (inputs in userFullname) {
      if (!Helpers.isValidAlphabet(userFullname[inputs])) {
        return Helpers.returnForError(req, res, 400, `invalid ${inputs} character`); }
    }

    if (!othername) {
      return next();
    } else if (Helpers.isNotString(othername)) {
      return Helpers.returnForError(req, res, 400, "invalid othername");
    } else if (!(/[^\s+]/g.test(othername))) {
      return Helpers.returnForError(req, res, 400, "remove white-space from othername");
    } else if (!Helpers.isValidAlphabet(othername)) {
      return Helpers.returnForError(req, res, 400, "invalid othername character");
    }
    next();
  }

  /**
  * Validates phoneNumber input for signup and signin
  * @param  {object} req - Contains the body of the request.
  * @param {object} res - Contains the returned response.
  * @param  {next} - Proceeds to the next method on the route
  * @return {undefined}
  */
  validateNumber(req, res, next) {
    const { phoneNumber } = req.body;

    if (!Helpers.isValidNumber(phoneNumber)) {
      Helpers.returnForError(req, res, 400, "invalid phoneNumber character");
    } else {
      next();
    }
  }


  /**
   * Validates if users exist in the database
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @param  { next } - Proceeds to the next method on the route
   * @return {undefined}
   */
  doesUserExist(req, res, next) {
    const { email, username, phoneNumber } = req.body;

    db.any("SELECT * FROM users WHERE email = $1 OR username = $2 OR phoneNumber = $3", [email, username, phoneNumber])
      .then(data => {
        if (data.length > 0) {
          Helpers.returnForError(req, res, 400, "user already exist");
        } else {
          next();
        }
      });
  }

  /**
   * Represents a login form validator
   * @param {object} req - The body request
   * @param {object} res - The body response
   * @param {object} next - function to execute next middleware
   * @return {undefined}
   */
  signInValidation (req, res, next) {
    const { emailUsername, password } = req.body;
    const whitespaceChecker = /[^\s+]/g;
    if (typeof emailUsername === "boolean" || typeof password === "boolean") {
      Helpers.returnForError(req, res, 400, "invalid email/username or password");
    } else if (!emailUsername) {
      Helpers.returnForError(req, res, 400, "email or username required");
    } else if (!password) {
      Helpers.returnForError(req, res, 400, "password required");
    } else if (!(whitespaceChecker.test(emailUsername))) {
      Helpers.returnForError(req, res, 400, "email or username required");
    } else {
      next();
    }
  }

}

