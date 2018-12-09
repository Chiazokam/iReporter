import { Helpers } from "../helpers";
import { userDB } from "../dummyDB";



export class PostValidator {
  /**
   * Validate values inside an array
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
  static validateArrayValues(req, res, next) {
    const { images, videos } = req.body;
    const urlArray = [images, videos];

    if (Helpers.isNotArray(urlArray)) {
      Helpers.returnForError(req, res, 400, "images and videos should be an array");

    } else if (Helpers.isStringInsideArray(images)) {
      Helpers.returnForError(req, res, 400, "invalid images link");

    } else if (Helpers.isStringInsideArray(videos)) {
      Helpers.returnForError(req, res, 400, "invalid videos link");

    } else if (Helpers.isValueInsideArrayEmpty(images)) {
      Helpers.returnForError(req, res, 400, "images link required");

    } else if (Helpers.isValueInsideArrayEmpty(videos)) {
      Helpers.returnForError(req, res, 400, "videos link required");

    } else {
      next();
    }
  }

  /**
   * Validates users location input field for a single string field
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
  static locationStringValidation  (req, res, next)  {
    const { location } = req.body;

    if (Helpers.isNotString(location)) {
      Helpers.returnForError(req, res, 400, "invalid input location");
    } else if (!location) {
      Helpers.returnForError(req, res, 400, "location required");
    } else {
      next();
    }
  }

  /**
   * Validates the comment input field for a single string field
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
  static commentStringValidation(req, res, next) {
    const { comment } = req.body;

    if (!comment) {
      Helpers.returnForError(req, res, 400, "comment field is required");
    } else {
      next();
    }
  }

  /**
   * Validates the profile image input field
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
  static profileImageStringValidation(req, res, next) {
    const { profileImage } = req.body;

    if (Helpers.isNotString(profileImage)) {
      Helpers.returnForError(req, res, 400, "invalid profile image input");
    } else if (!profileImage) {
      Helpers.returnForError(req, res, 400, "profile image required");
    } else {
      next();
    }
  }


  /**
   * Validates users input for report creation
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
  static multipleStringValidation(req, res, next) {
    const { title, comment, type, location, images, videos } = req.body;
    const strings = { title, type, location };
    const reqObj = { title, comment, type, location, images, videos };
    let inputs; const excessSpace = /[^\s+]/g;
    for (inputs in reqObj) {
      if (!reqObj[inputs]) {
        return Helpers.returnForError(req, res, 400, `input field ${inputs} required`);
      }
    }
    for (inputs in strings) {
      if (!(excessSpace.test(strings[inputs]))) {
        return Helpers.returnForError(req, res, 400, `${inputs} is required`);
      }
    }
    for (inputs in strings) {
      if (Helpers.isNotString(strings[inputs])) {
        return Helpers.returnForError(req, res, 400, `invalid input field ${inputs}`);
      }
    }
    next();
  }


  /**
   * Checks if input is a red-flag type
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
  static isValidIncidentType(req, res, next) {
    const { type } = req.body;
    if (type.toLowerCase() !== "red-flag" && type.toLowerCase() !== "intervention") {
      Helpers.returnForError(req, res, 400, "invalid incident type");
    } else {
      next();
    }
  }


  /**
   * Validate status input by admin
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route.
   * @return {undefined}
   */
  static validateStatus(req, res, next) {
    const { status } = req.body;
    const validValues = ["draft", "under investigation", "resolved", "rejected"];
    let inputs;

    if (!status) {
      return Helpers.returnForError(req, res, 400, "status required");
    } else if (typeof status !== "string") {
      return Helpers.returnForError(req, res, 400, "invalid input status");
    }

    for (inputs = 0; inputs < validValues.length; inputs++) {
      if (status.toString().toLowerCase() === validValues[inputs] ){
        return next();
      }
    }
    Helpers.returnForError(req, res, 400, "invalid status selection");
  }

}

