import { Helpers } from "../helpers";
import { incidentsDB } from "../dummyDB";

let inputs;

/**
 * Validates users input
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
				data: [{message: "undefined input"}]
			});
		}
	}

	for (inputs in strings) {
		if (Helpers.isNotString(strings[inputs])) {
			return res.status(400).json({
				status: 400,
				data: [{message: "invalid input"}]
			});
		}
	}

	if (Helpers.isNotArray(urlArray)){
		return res.status(400).json({
			status: 400,
			data: [{ message: "invalid input" }]
		});
	}

	if (Helpers.isStringInsideArray(images)){
		return res.status(400).json({
			status: 400,
			data: [{ message: "invalid input" }]
		});
	}

	if (Helpers.isStringInsideArray(videos)) {
		return res.status(400).json({
			status: 400,
			data: [{ message: "invalid input" }]
		});
	}

	if (Helpers.isValueInsideArrayEmpty(images)){
		return res.status(400).json({
			status: 400,
			data: [{ message: "undefined input" }]
		});
	}

	if (Helpers.isValueInsideArrayEmpty(videos)) {
		return res.status(400).json({
			status: 400,
			data: [{ message: "undefined input" }]
		});
	}

	if (type.toLowerCase() !== "redflag" && type.toLowerCase() !== "intervention") {
		return res.status(400).json({
			status: 400,
			data: [{ message: "invalid input" }]
		});
	}

	return next();
};

export const isDummyDbEmpty = (req, res, next) => {
	if (incidentsDB.length < 1) {
		return res.status(404).json({
			status: 404,
			data: [{ message: "not found" }]
		});
	} else {
		return next();
	}
};


