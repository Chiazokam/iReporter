import { Helpers } from "../helpers";
import { db } from "../database";

let inputs;

export class SignUpSignInValidator {
	/**
   * Validates users input for signup and signin
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @param  { next } - Proceeds to the next method on the route
   */
	multiStringValidation(req, res, next) {
		const { username, firstname, lastname, phoneNumber, email, password, confirmPassword } = req.body;
		const reqArray = [username, firstname, lastname, phoneNumber, email, password];

		for (inputs = 0; inputs < reqArray.length; inputs++) {
			if (!reqArray[inputs]) {
				return Helpers.returnForError(req, res, 400, "undefined input");
			}
			if (!(/[^\s+]/g.test(reqArray[inputs]))) {
				return Helpers.returnForError(req, res, 400, "undefined input");
			}
			if (Helpers.isNotString(reqArray[inputs])) {
				return Helpers.returnForError(req, res, 400, "invalid input");
			}
		}

		if (Helpers.isValidEmail(email)[0].emailEvaluation !== true && Helpers.isValidEmail(email)[0].hasHostName !== true) {
			Helpers.returnForError(req, res, 400, "invalid email");
		} else if (password !== confirmPassword) {
			return Helpers.returnForError(req, res, 400, "password didn't match");
		}
		next();
	}


	/**
   * Validates users othername for signup
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @param  { next } - Proceeds to the next method on the route
   */
	namesValidation(req, res, next) {
		const { othername, firstname, lastname } = req.body;
		const userFullname = [firstname, lastname];

		for (inputs = 0; inputs < userFullname.length; inputs++) {
			if (!Helpers.isValidAlphabet(userFullname[inputs])) {
				return Helpers.returnForError(req, res, 400, "invalid name character");
			}
		}

		if (!othername) {
			return next();
		} else if (Helpers.isNotString(othername)) {
			Helpers.returnForError(req, res, 400, "invalid input");
		} else if (!(/[^\s+]/g.test(othername))) {
			Helpers.returnForError(req, res, 400, "undefined input");
		}
		next();
	}

	/**
* Validates phoneNumber input for signup and signin
* @param  { object } req - Contains the body of the request.
* @param { object } res - Contains the returned response.
* @param  { next } - Proceeds to the next method on the route
*/
	validateNumber(req, res, next) {
		const { phoneNumber } = req.body;

		if (!Helpers.isValidNumber(phoneNumber)) {
			Helpers.returnForError(req, res, 400, "invalid phoneNumber");
		} else {
			next();
		}
	}


	/**
   * Validates if users exist in the database
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @param  { next } - Proceeds to the next method on the route
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
 */
	signInValidation (req, res, next) {
		const { emailOrUsername, password } = req.body;

		if (typeof emailOrUsername === "boolean" || typeof password == "boolean") {
			Helpers.returnForError(req, res, 400, "invalid input");
		} else if (!emailOrUsername) {
			Helpers.returnForError(req, res, 400, "undefined input");
		} else if (!password) {
			Helpers.returnForError(req, res, 400, "undefined input");
		} else if (!(/[^\s+]/g.test(emailOrUsername))) {
			Helpers.returnForError(req, res, 400, "undefined input");
		} else {
			next();
		}
	}

}

