import { Helpers } from "../helpers";
import { userDB } from "../dummyDB";


/**
 * Validate values inside an array
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
export const validateArrayValues = (req, res, next) => {
	const { images, videos } = req.body;
	const urlArray = [images, videos];

	if (Helpers.isNotArray(urlArray)) {
		Helpers.returnForError(req, res, 400, "images or videos not an array");

	} else if (Helpers.isStringInsideArray(images)) {
		Helpers.returnForError(req, res, 400, "images content is not a string");

	} else if (Helpers.isStringInsideArray(videos)) {
		Helpers.returnForError(req, res, 400, "videos content is not a string");

	} else if (Helpers.isValueInsideArrayEmpty(images)) {
		Helpers.returnForError(req, res, 400, "undefined input images");

	} else if (Helpers.isValueInsideArrayEmpty(videos)) {
		Helpers.returnForError(req, res, 400, "undefined input videos");

	} else {
		next();
	}
};

/**
 * Validates users location input field for a single string field
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
export const locationStringValidation = (req, res, next) => {
	const { location } = req.body;

	Helpers.thoroughStringCheck(req, res, location, next);
};

/**
 * Validates the comment input field for a single string field
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 */
export const commentStringValidation = (req, res, next) => {
	const { comment } = req.body;

	Helpers.thoroughStringCheck(req, res, comment, next);
};


/**
 * Validates users input for report creation
 * @param  { object } req - Contains the body of the request.
 * @param { object } res - Contains the returned response.
 * @param  { next } - Proceeds to the next method on the route
 * @return { undefined }
 */
export const multipleStringValidation = (req, res, next) => {
	const { title, comment, type, location, images, videos } = req.body;
	const strings = [title, comment, type, location];
	const reqArray = [title, comment, type, location, images, videos];

	let inputs;

	for (inputs in reqArray) {
		if (!reqArray[inputs]) {
			return Helpers.returnForError(req, res, 400, `undefined input ${reqArray[inputs]}`);
		}
	}
	for (inputs in strings) {
		if (!(/[^\s+]/g.test(reqArray[inputs]))) {
			return Helpers.returnForError(req, res, 400, `undefined input ${strings[inputs]}`);
		}
	}
	for (inputs in strings) {
		if (Helpers.isNotString(strings[inputs])) {
			return Helpers.returnForError(req, res, 400, `undefined input ${strings[inputs]}`);
		}
	}
	validateArrayValues(req, res, next);
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
		Helpers.returnForError(req, res, 400, `invalid input ${type}`);
	} else {
		next();
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
		Helpers.returnForError(req, res, 400, `invalid user ${createdBy}`);
	} else if (userId.length < 1) {
		Helpers.returnForError(req, res, 404, "user not found");
	} else {
		next();
	}
};


