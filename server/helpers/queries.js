import { Helpers } from "./predefinedMethods";
import { db } from "../database";

const trim = new Helpers();


export class Queries {

  /**
   * Creates a red-flag or intervention record
   * @param {object} createObject- body input request from user
   * @return {undefined}
   */
  createIncidentQuery(createObject) {
    return db.any("INSERT INTO incidents(title, comment, type, location, images, videos, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [String(createObject.title).trim(), String(createObject.comment).trim(), trim.trimMe(createObject.type), String(createObject.location).trim(), createObject.images, createObject.videos, "draft", createObject.id]);
  }

  /**
   * single argument select query statment
   * @param {string} tableName- database table
   * @param {string} unique_column - unique column
   * @param {string} unique_column_value - unique columns value
   * @return {undefined}
   */
  selectQuery(tableName, unique_column, unique_column_value) {
    return db.any("SELECT * FROM " + tableName + " WHERE " + unique_column + " = $1 ", [unique_column_value]);
  }

  /**
   * double argument select query statment
   * @param {string} tableName- database table
   * @param {string} unique_column - unique column
   * @return {undefined}
   */
  loginQuery(email, username) {
    return db.any("SELECT * FROM users WHERE email = $1 OR username = $2", [trim.trimMe(email), trim.trimMe(username)]);
  }

  /**
   * status update query statment
   * @param {string} status - draft, rejected, resolved or under investigation
   * @param {number} incidentsId
   * @return {undefined}
   */
  statusUpdateQuery(status, incidentsId) {
    return db.any("UPDATE incidents SET status = $1 WHERE id = $2 RETURNING *", [status, incidentsId]);
  }

  /**
   * profile image update query statment
   * @param {string} profileImage - image string
   * @param {number} userId
   * @return {undefined}
   */
  profileImageUpdateQuery(profileImage, userId) {
    return db.any("UPDATE users SET profileimage = $1 WHERE id = $2 RETURNING *", [trim.trimMe(profileImage), userId]);
  }


  /**
   * creates new user query
   * @param {object} userDetails
   * @return {undefined}
   */
  createUserQuery(userDetails) {
    return db.any("INSERT INTO users(username, firstname, lastname, othername, email, phonenumber, password, isadmin, profileimage) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [trim.trimMe(userDetails.username), trim.trimMe(userDetails.firstname), trim.trimMe(userDetails.lastname), trim.trimMe(userDetails.othername), trim.trimMe(userDetails.email), trim.trimMe(userDetails.phoneNumber), userDetails.hash, userDetails.false, userDetails.profileimage]);
  }

  /**
   * Updates a specific record
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {object} updateArgumentObject - contains parameters for updates
   * @return {undefined}
   */
  updateSpecificRecord(req, res, updateArgumentObject) {
    db.any("SELECT * FROM " + updateArgumentObject.tableName + " WHERE id = $1", [updateArgumentObject.recordId])
      .then((data) => {
        if (data.length < 1) {
          Helpers.returnForError(req, res, 404, "record not found");
        } else if (data[0].createdby !== updateArgumentObject.userId) {
          Helpers.returnForError(req, res, 403, "your not allowed to perform that action");
        } else {
          db.any("UPDATE " + updateArgumentObject.tableName + " SET " + updateArgumentObject.requestBodyPropertyName +
            " = $1 WHERE id = $2 RETURNING *", [updateArgumentObject.requestBodyPropertyValue, updateArgumentObject.recordId])
            .then((updatedData) => {
              const updatedRecordId = updatedData[0].id;
              Helpers.returnForSuccess(req, res, updateArgumentObject.statusCode, updatedRecordId, updateArgumentObject.message);
            });
        }
      });
  }


  /**
   * Delete a specific record
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {object} deleteArgumentObject - contains parameters for updates
   * @return {undefined}
   */
  deleteSpecificRecord(req, res, deleteArgumentObject) {
    db.any("SELECT * FROM " + deleteArgumentObject.tableName + " WHERE id = $1", [deleteArgumentObject.recordId])
      .then((data) => {
        if (data.length < 1) {
          Helpers.returnForError(req, res, 404, "record not found");
        } else if (data[0].createdby !== deleteArgumentObject.userId) {
          Helpers.returnForError(req, res, 403, "your not allowed to perform that action");
        } else {
          db.any("DELETE FROM " + deleteArgumentObject.tableName + " WHERE id = $1", [deleteArgumentObject.recordId])
            .then(() => {
              Helpers.returnForSuccess(req, res, deleteArgumentObject.statusCode, deleteArgumentObject.recordId, deleteArgumentObject.message);
            });
        }
      });
  }


  /**
   * Returns all records type
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {string}
   * @return {undefined}
   */
  getAllRecordsType(req, res, type) {
    db.any("SELECT * FROM incidents WHERE type = $1", [type])
      .then((data) => {
        Helpers.returnSuccessForGET(req, res, 200, data);
      });
  }


  /**
   * Returns a specific record for both incident and red-flag type
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {number} id
   * @return {undefined}
   */
  getSpecificRecord(req, res, id) {
    db.any("SELECT * FROM incidents WHERE id = $1", [id])
      .then((data) => {
        if (data.length < 1) {
          Helpers.returnForError(req, res, 404, "record not found");
        } else {
          Helpers.returnSuccessForGET(req, res, 200, data);
        }
      });
  }

}
