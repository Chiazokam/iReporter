/**
 * @class \{{{object}}\} {{Helper}}{{Methods for validation}}
 */
export class Helpers {
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
			if (!arr[inputs]) {
				return true;
			}
		}
	}
}




