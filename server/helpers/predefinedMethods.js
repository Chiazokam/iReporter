/**Class methods representing abstracted codes */
export class Helpers {
	/**
   * Checks for a valid array
   * @param {object} array - array of elements
   * @return {boolean} returns true
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
   * @return {boolean} returns true or false
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
  * @param {object} array - all datatypes
  * @return {boolean} returns true
  */
	static isStringInsideArray(array) {
		for (let inputs in array) {
			if (typeof array[inputs] !== "string") {
				return true;
			}
		}
	}

	/**
  * Validates values inside an array is undefined
  * @param {string} str - string of values inside an array
  * @return {boolean} returns true
  */
	static isValueInsideArrayEmpty(str) {
		for (let inputs in str) {
			if (!str[inputs] || !(/[^\s+]/g.test(str[inputs]))) {
				return true;
			}
		}
	}

	/**
  * Validates a stringed geolocation
  * @param {string} string
  * @return {undefined}
  */
	static isNotAValidGeolocation(req, res, next) {
		const { location } = req.body;
		if (!(/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/gm.test(location))) {
			Helpers.returnForError(req, res, 400, "invalid location coordinates");
		} else {
			next();
		}
	}

	/**
   * Validates users input for a single string field
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {string} string - Contains a stringed value
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
	static thoroughStringCheck(req, res, string, next) {
		if (Helpers.isNotString(string)) {
			Helpers.returnForError(req, res, 400, `invalid input ${string}`);
		} else if (!string) {
			Helpers.returnForError(req, res, 400, `invalid input ${string}`);
		} else if (!(/[^\s+]/g.test(string))) {
			Helpers.returnForError(req, res, 400, `input ${string} not specified`);
		} else {
			next();
		}
	}

	/**
   * Return template for CREATE or Update success
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {number} statusCode - Contains the http-status code
   * @param {number} id - Contains the resource id
   * @param {string} message - Contains the return message
   * @return {undefined}
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
   * @return {undefined}
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
   * @return {undefined}
   */
	static returnSuccessForGET(req, res, statusCode, data) {
		res.status(statusCode).json({
			status: statusCode,
			data: data,
		});
	}

}




