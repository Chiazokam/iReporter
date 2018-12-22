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
   * @param {string} -type
   * @return {undefined}
   */
  getAllRecordsType(req, res, type) {
    db.any("SELECT incidents.id, incidents.title, incidents.comment, incidents.type, incidents.location, incidents.status, incidents.images, incidents.videos, incidents.createdby, incidents.createdon, users.username, users.firstname, users.lastname, users.othername, users.email, users.profileimage, users.phonenumber, users.isadmin FROM incidents, users WHERE incidents.createdby = users.id")
      .then((recordData) => {
        const data = recordData.filter((elem)=> elem.type === type);
        Helpers.returnSuccessForGET(req, res, 200, data);
      });
  }

  /**
   * Checks if user exist ion the database query
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {string} email
   * @param {string} username
   * @param {string} phoneNumber
   * @return {undefined}
   */
  selectUniqueFields(email, username, phoneNumber) {
    return db.any("SELECT * FROM users WHERE email = $1 OR username = $2 OR phoneNumber = $3", [email, username, phoneNumber]);
  }


  /**
   * Returns a specific record for both incident and red-flag type
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @param {number} id
   * @return {undefined}
   */
  getSpecificRecord(req, res, id) {
    db.any("SELECT incidents.id, incidents.title, incidents.comment, incidents.type, incidents.location, incidents.status, incidents.images, incidents.videos, incidents.createdby, incidents.createdon, users.username, users.firstname, users.lastname, users.othername, users.email, users.profileimage, users.phonenumber, users.isadmin FROM incidents, users WHERE incidents.createdby = users.id AND incidents.id = $1", [id])
      .then((incidentData) => {
        const data = incidentData;
        if (incidentData.length < 1) {
          return Helpers.returnForError(req, res, 404, "record not found");
        }
        Helpers.returnSuccessForGET(req, res, 200, data);
      });
  }


  /**
  * Returns the numbers of the different records on the database
  * @param  {object} req - Contains the body of the request.
  * @param {object} res - Contains the returned response
  * @param {number} userId - createdby id
  * @param {string} incidentType - red-flag or intervention
  * @return {undefined}
  */
  getStatusCount(req, res, userId, incidentType) {

    db.any("SELECT * FROM incidents WHERE createdby = $1 AND type = $2", [userId, incidentType])
      .then((data) => {
        const counts = {
          draft: 0,
          underInvestigation: 0,
          resolved: 0,
          rejected: 0
        };
        if (data.length < 1) {
          Helpers.returnSuccessForGET(req, res, 200, [counts]);
        } else {
          for (let index in data) {
            if (data[index].status.toLowerCase() === "draft") {
              counts.draft += 1;
            } else if (data[index].status.toLowerCase() === "under investigation") {
              counts.underInvestigation += 1;
            } else if (data[index].status.toLowerCase() === "resolved") {
              counts.resolved += 1;
            } else if (data[index].status.toLowerCase() === "rejected") {
              counts.rejected += 1;
            }
          }
          Helpers.returnSuccessForGET(req, res, 200, [counts]);
        }
      });
  }


  /**
   * Returns all records for a specific user
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response
   * @param {number} userId - createdby id
   * @param {string} incidentType - red-flag or intervention
   * @return {undefined}
   */
  getUsersRecords(req, res, userId, incidentType) {

    db.any("SELECT * FROM incidents WHERE createdby = $1 AND type = $2", [userId, incidentType])
      .then((data) => {
        Helpers.returnSuccessForGET(req, res, 200, data);
      });
  }

}
