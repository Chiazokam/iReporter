


/**
 * @class \{{{object}}\} {{Helper}}{{Methods for validation}}
 */
export class Helper {
	/**
   * Validates an email field
   * @param {string} email - users email
   */
	static isValidEmail(email) {
		return (/\S+@\S+\.\S+/.test(email) && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email));
	}

	/**
   * Validates a number field
   * @param {string} number - set of stringed number(s)
   */
	static isValidNumber(number) {
		return /^[0-9]*$/gm.test(number);
	}

	/**
 * Validates a string field for valid alphabet
 * @param {string} string - set of strings
 */
	static isValidAlphabet(string) {
		return /^[a-z]*$/gm.test(string);
	}

	/**
 * Checks for a valid array
 * @param {object} elem - array of elements
 */
	static arrayCheck(elem) {
		return Array.isArray(elem);
	}

	/**
 * Validates for strings
 * @param {string} elem - set of strings
 */
	static	stringCheck(elem) {
		if (typeof elem === "string") {
			return true;
		} else {
			return false;
		}
	}
}


