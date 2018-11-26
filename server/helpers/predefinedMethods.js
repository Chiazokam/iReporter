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
}




