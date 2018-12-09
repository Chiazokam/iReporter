import { Helpers } from "../helpers/predefinedMethods";
import { db } from "../database";

const strTrim = new Helpers();

export class Incidents {

  /**
   * Creates a red-flag or intervention record
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  createAnIncidentRecord(req, res){
    const { title, comment, type, location, images, videos } = req.body;
    const { id } = req.userInfo; //userId

    db.any("INSERT INTO incidents(title, comment, type, location, images, videos, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [String(title).trim(), String(comment).trim(), strTrim.trimMe(type), String(location).trim(), images.join(" , "), videos.join(" , "), "draft", id])
      .then(() => {
        db.any("SELECT * FROM incidents WHERE createdBy = $1", [id])
          .then((data) => {
            const lastRecord = (data.length - 1);
            const recordId = data[lastRecord].id;
            if (type === "red-flag") {
              Helpers.returnForSuccess(req, res, 201, recordId, "Created red-flag record");
            } else {
              Helpers.returnForSuccess(req, res, 201, recordId, "Created intervention record");
            }
          });
      });

  }


  /**
   * Returns all redflag records
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getAllRedflagRecords(req, res) {
    Helpers.getAllRecordsType(req, res, "red-flag");
  }


  /**
   * Updates a specific redflag record's location
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @return {undefined}
   */
  updateRedflagRecordLocation(req, res) {
    const { location } = req.body;
    const recordId = req.params.id;
    const userId = req.userInfo.id;

    const updateArgumentObject = {
      tableName: "incidents",
      recordId,
      userId,
      requestBodyPropertyName: "location",
      requestBodyPropertyValue: location,
      statusCode : 200,
      message: "Updated red-flag record's location"
    };

    Helpers.updateSpecificRecord(req, res, updateArgumentObject);
  }

  /**
   * Update a specific redflag record's comment
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  updateRedflagRecordComment(req, res) {
    const { comment } = req.body;
    const recordId = req.params.id;
    const userId = req.userInfo.id;

    const updateArgumentObject = {
      tableName: "incidents",
      recordId,
      userId,
      requestBodyPropertyName: "comment",
      requestBodyPropertyValue: comment,
      statusCode: 200,
      message: "Updated red-flag record's comment"
    };

    Helpers.updateSpecificRecord(req, res, updateArgumentObject);
  }



  /**
   * Update incident record's status
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  updateIncidentsStatus(req, res) {
    const { status } = req.body;
    const incidentsId = req.params.id;
    const userId = req.userInfo.id;

    db.any("SELECT * FROM users WHERE id = $1", [userId])
      .then((data) => {
        if (data.length < 1) {
          return Helpers.returnForError(req, res, 404, "user not found");
        } else if (data[0].isadmin !== true) {
          return Helpers.returnForError(req, res, 401, "not an admin"); }

        db.any("SELECT * FROM incidents WHERE id = $1", [incidentsId])
          .then((data2) => {
            if (data2.length < 1) {
              return Helpers.returnForError(req, res, 404, "record not found");
            } else {
              db.any("UPDATE incidents SET status = $1 WHERE id = $2 RETURNING *", [status, incidentsId])
                .then((updatedData) => {
                  const updatedRecordId = updatedData[0].id;
                  Helpers.returnForSuccess(req, res, 200, updatedRecordId, "record's status updated");
                }); }
          });
      });
  }


  /**
   * Delete a specific redflag record's comment
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  deleteRedflagRecordRecord(req, res) {
    const recordId = req.params.id;
    const userId = req.userInfo.id;

    const deleteArgumentObject = {
      tableName: "incidents",
      recordId,
      userId,
      statusCode: 200,
      message: "red-flag record has been deleted"
    };

    Helpers.deleteSpecificRecord(req, res, deleteArgumentObject);
  }


  /**
   * Returns a redflag records
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getSpecificRedFlagRecord(req, res) {
    const id = req.params.id;
    Helpers.getSpecificRecord(req, res, id);
  }

}




