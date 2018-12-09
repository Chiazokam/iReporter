import { Helpers } from "../helpers/predefinedMethods";



export class GetValidator {

  /**
   * Checks if any red-flag record is found in the database
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param  {next} - Proceeds to the next method on the route
   * @return {undefined}
   */
  static doesRedFlagRecordExist (req, res, next) {
    Helpers.doesRecordTypeExist(req, res, "red-flag", next);
  }

}




