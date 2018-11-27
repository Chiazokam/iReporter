/**
 * @class \{{{object}}\} {{Helper}}{{Methods for validation}}
 */
export class Helpers {
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
				id: id,
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
			data: data,
		});
	}

}




