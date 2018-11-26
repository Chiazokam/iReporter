import { incidentsDB } from "../dummyDB";

/**
 * Checks if database is empty
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
export const isDummyDbEmpty = (req, res, next) => {
	if (incidentsDB.length < 1) {
		return res.status(404).json({
			status: 404,
			error: "records not found",
		});
	} else {
		return next();
	}
};

/**
 * Checks if any red-flag record is found in the database
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
export const doesRedFlagRecordExist = (req, res, next) => {
	const redFlagsOnly = incidentsDB.filter((redFlag) => redFlag.type === "red-flag");
	if (redFlagsOnly < 1) {
		return res.status(404).json({
			status: 404,
			error: "records not found",
		});
	} else {
		return next();
	}
};


