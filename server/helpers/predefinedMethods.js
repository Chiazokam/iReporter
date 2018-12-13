/**Represents abstracted methods */
export class Helpers {

  /**
   * Validates a string field for valid alphabet
   * @param {string} string - set of strings
   * @return {boolean}
   */
  static isValidAlphabet(string) {
    const alphabetMatch = /^[a-z]*$/gm;
    return alphabetMatch.test(string.toString().toLowerCase());
  }

  /**
   * Validates a number field
   * @param {string} number - set of stringed number(s)
   * @return {boolean}
   */
  static isValidNumber(number) {
    const numberMatch = /^[0-9]*$/gm;
    return numberMatch.test(number);
  }

  /**
   * Validates an email field
   * @param {string} email - users email
   * @return {object} boolean response
   * @return {boolean}
   */
  static isValidEmail(email) {
    const emailMatchOne = /\S+@\S+\.\S+/;
    const emailMatchTwo = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailEvaluation = (emailMatchOne.test(email) && emailMatchTwo.test(email));

    return emailEvaluation;
  }

  /**
   * Checks for a valid array
   * @param {object} array - array of elements
   * @return {boolean}
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
   * @return {boolean}
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
  * @param {object} arr
  * @return {boolean}
  */
  static isStringInsideArray(arr) { //every method
    for (let inputs in arr) {
      if (typeof arr[inputs] !== "string") {
        return true;
      }
    }
  }

  /**
   * Validates values inside an array is undefined
   * @param {object} arr
   * @return {boolean}
   */
  static isValueInsideArrayEmpty(arr) {
    for (let inputs in arr) {
      if (!arr[inputs] || !(/[^\s+]/g.test(arr[inputs]))) {
        return true;
      }
    }
  }

  /**
   * Validates whole numbers
   * @param {string} value
   * @return {boolean}
   */
  static isNotWholeNumber(value) {
    const wholeNumberRegex = /^\d+$/gm;
    const bool = wholeNumberRegex.test(value.toString());
    return !bool;
  }

  /**
   * Validates a stringed geolocation
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {string} string
   * @return {undefined}
   */
  static isNotAValidGeolocation(req, res, next) {
    const { location } = req.body;
    const locationMatch = /^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/gm;
    if (!(locationMatch.test(location))) {
      Helpers.returnForError(req, res, 400, "invalid location format");
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
        id,
        message,
      }]
    });
  }

  /**
   * Return template for Error
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {number} statusCode - Contains the http-status code
   * @param {string} message - Contains the return message
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
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {number} statusCode - Contains the http-status code
   * @param {object} data - Contains the return message
   * @return {undefined}
   */
  static returnSuccessForGET(req, res, statusCode, data) {
    res.status(statusCode).json({
      status: statusCode,
      data,
    });
  }

  /**
   * Represents template for user Signup and Signin success
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {number} statusCode - Contains the http-status code
   * @param {string} token - string of encrypted user details
   * @param {object} user - Contains the return user details object
   * @return {undefined}
   */
  static returnForSigninSignUp(req, res, statusCode, token, user) {
    res.status(statusCode).json({
      status: statusCode,
      data: [{
        token,
        user,
      }]
    });
  }

  /**
   * Trims off white-spaces from the strings extremes and also converts numbers to strings
   * @param {number} elem - number
   * @param {string} elem - string
   * @returns {string}
   */
  trimMe(elem) {
    const trimmed = elem.toString().trim();
    const removeAllWhiteSpaces = trimmed.replace(/\s/g, "");

    return removeAllWhiteSpaces;
  }


  /**
   * Flags a single white space if found
   * @param {string} text
   * @return {boolean}
   */
  static nowhiteSpace(text){
    const value = /\s/.test(text);
    return value;
  }


}
