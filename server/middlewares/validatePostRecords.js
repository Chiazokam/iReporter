import { Helpers } from "../helpers";
import { userDB } from "../dummyDB";

let inputs;

/**
 * Validates users input for report creation
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
export const reportValidation = (req, res, next) => {
	const { title, comment, type, latitude, longitude, location, images, videos } = req.body;
	const urlArray = [images, videos];
	const strings = [title, comment, type, latitude, longitude, location];
	const reqArray = [title, comment, type, latitude, longitude, location, images, videos];

	for (inputs in reqArray) {
		if (!reqArray[inputs]) {
			return res.status(400).json({
				status: 400,
				error: "undefined input",
			});
		}
	}

	for (inputs in strings) {
		if (!(/[^\s+]/g.test(reqArray[inputs]))) {
			return res.status(400).json({
				status: 400,
				error: "undefined input",
			});
		}
	}

	for (inputs in strings) {
		if (Helpers.isNotString(strings[inputs])) {
			return res.status(400).json({
				status: 400,
				error: "invalid input",
			});
		}
	}

	if (Helpers.isNotArray(urlArray)){
		return res.status(400).json({
			status: 400,
			error: "invalid input",
		});
	} else if (Helpers.isStringInsideArray(images)){
		return res.status(400).json({
			status: 400,
			error: "invalid input",
		});
	} else if (Helpers.isStringInsideArray(videos)) {
		return res.status(400).json({
			status: 400,
			error: "invalid input",
		});
	} else if (Helpers.isValueInsideArrayEmpty(images)){
		return res.status(400).json({
			status: 400,
			error: "undefined input",
		});
	} else if (Helpers.isValueInsideArrayEmpty(videos)) {
		return res.status(400).json({
			status: 400,
			error: "undefined input",
		});
	} else {
		return next();
	}
};

/**
 * Checks if input is a red-flag type
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
export const isRedFlag = (req, res, next) => {
	const { type } = req.body;
	if (type.toLowerCase() !== "red-flag") {
		return res.status(400).json({
			status: 400,
			error: "invalid input",
		});
	} else {
		return next();
	}
};

/**
 * Validates if users exist in the database
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
export const isUser = (req, res, next) => {
	const { createdBy } = req.body;
	const userId = userDB.filter((user) => user.id === createdBy);

	if (typeof createdBy !== "number") {
		return res.status(400).json({
			status: 400,
			error: "invalid input",
		});
	}

	if (userId.length < 1) {
		return res.status(404).json({
			status: 404,
			error: "user not found",
		});
	} else {
		return next();
	}
};


