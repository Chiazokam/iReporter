import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.load();

/**
 * @class \{{{object}}\} {{Helper}}{{Methods for validation}}
 */
export class Helpers {

	/**
  * Validates a string field for valid alphabet
  * @param {string} string - set of strings
  */
	static isValidAlphabet(string) {
		return /^[a-z]*$/gm.test(string.toString().toLowerCase());
	}

	/**
   * Validates a number field
   * @param {string} number - set of stringed number(s)
   */
	static isValidNumber(number) {
		return /^[0-9]*$/gm.test(number);
	}

	/**
   * Validates an email field
   * @param {string} email - users email
   * @return {object} boolean response
   */
	static isValidEmail(email) {
		const emailEvaluation = (/\S+@\S+\.\S+/.test(email) && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));

		return emailEvaluation;
	}

	/**
   * Checks for a valid array
   * @param {object} array - array of elements
   */
	static isNotArray(array) {
		for (let inputs in array) {
			if (!Array.isArray(array[inputs])) {
				return true;
			}
		}
	}

	/**
   * Validates for strings
   * @param {string} elem - strings
   */
	static isNotString(elem) {
		if (typeof elem !== "string") {
			return true;
		} else {
			return false;
		}
	}

	/**
* Validates values inside an array if its a string
* @param {any} arr - all datatypes
*/
	static isStringInsideArray(arr) {
		for (let inputs in arr) {
			if (typeof arr[inputs] !== "string") {
				return true;
			}
		}
	}

	/**
  * Validates values inside an array is undefined
  * @param {any} arr - all datatypes
  */
	static isValueInsideArrayEmpty(arr) {
		for (let inputs in arr) {
			if (!arr[inputs] || !(/[^\s+]/g.test(arr[inputs]))) {
				return true;
			}
		}
	}

	/**
* Validates a stringed geolocation
* @param { string } string - all datatypes
*/
	static isNotAValidGeolocation(req, res, next) {
		const { location } = req.body;
		if (!(/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/gm.test(location))) {
			Helpers.returnForError(req, res, 400, "invalid input");
		} else {
			next();
		}
	}

	/**
   * Validates users input for a single string field
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @param { string } string - Contains a stringed value
   * @param  { next } - Proceeds to the next method on the route
   */
	static thoroughStringCheck(req, res, string, next) {
		if (Helpers.isNotString(string)) {
			Helpers.returnForError(req, res, 400, "invalid input");
		} else if (!string) {
			Helpers.returnForError(req, res, 400, "undefined input");
		} else if (!(/[^\s+]/g.test(string))) {
			Helpers.returnForError(req, res, 400, "undefined input");
		} else {
			next();
		}
	}

	/**
   * Return template for CREATE or Update success
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @param { number } statusCode - Contains the http-status code
   * @param { number } id - Contains the resource id
   * @param { string } message - Contains the return message
   */
	static returnForSuccess(req, res, statusCode, id, message) {
		res.status(statusCode).json({
			status: statusCode,
			data: [{
				id,
				message,
			}]
		});
	}

	/**
   * Return template for Error
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @param { number } statusCode - Contains the http-status code
   * @param { string } message - Contains the return message
   */
	static returnForError(req, res, statusCode, message) {
		res.status(statusCode).json({
			status: statusCode,
			error: message,
		});
	}

	/**
 * Return template for GET success
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param { number } statusCode - Contains the http-status code
 * @param { object } data - Contains the return message
 */
	static returnSuccessForGET(req, res, statusCode, data) {
		res.status(statusCode).json({
			status: statusCode,
			data,
		});
	}

	/**
 * Return template for user Signup and Signin success
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param { number } statusCode - Contains the http-status code
 * @param { string } token - string of encrypted user details
 * @param { string } message - Contains the return message
 */
	static returnForSigninSignUp(req, res, statusCode, token, message) {
		res.status(statusCode).json({
			status: statusCode,
			data: [{
				token,
				message,
			}]
		});
	}

	/**
   * Trims off white-spaces from the strings extremes and also converts numbers to strings
   * @param { number } elem - number
   * @param { string } elem - string
   */
	trimMe(elem) {
		return elem.toString().trim();
	}


	/**
* Token verification for Users
* @param {object} req - The request body
* @param {object} res - The response body
* @param {object} next - calls the next middleware
*/
	static verifyUsersToken(req, res, next) {
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
			Helpers.returnForError(req, res, 403, "Token not provided");
		}
	}

}




