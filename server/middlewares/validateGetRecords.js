import { incidentsDB } from "../dummyDB";
import { Helpers } from "../helpers/predefinedMethods";
import { Incidents } from "../controllers";


const red_flag_string = "red-flag";

export class GetValidator {
/**
 * Checks if database is empty
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
	static isDummyDbEmpty (req, res, next) {
		if (incidentsDB.length < 1) {
			Helpers.returnForError(req, res, 404, "records not found");
		} else {
			next();
		}
	}

	/**
 * Checks if any red-flag record is found in the database
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
	static doesRedFlagRecordExist (req, res, next) {
		const redFlagsOnly = incidentsDB.filter((redFlag) => redFlag.type === "red-flag");
		if (redFlagsOnly.length < 1) {
			Helpers.returnForError(req, res, 404, "records not found");
		} else {
			next();
		}
	}

	/**
* Checks if the specified red-flag id exists
* @param  { object } req - Contains the body of the request.
* @param { object } res - Contains the returned response.
* @param  { next } - Proceeds to the next method on the route
*/
	static doesSpecificRedFlagIdRecordExist (req, res, next) {
		const filtered = Incidents.filterRecords(req, res, red_flag_string);
		const specificRedFlag = filtered[2];

		if (specificRedFlag.length < 1) {
			Helpers.returnForError(req, res, 404, "record not found");
		} else {
			next();
		}
	}

}




