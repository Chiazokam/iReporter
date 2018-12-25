import { Helpers, Queries } from "../helpers";

const query = new Queries();

export class Incidents {

  /**
   * Creates a red-flag record
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  createRedflagRecord(req, res) {
    const { title, comment, location, images, videos } = req.body;
    const { id } = req.userInfo;

    const createObject = { title, comment, type: "red-flag", location, images, videos, id };

    query.createIncidentQuery(createObject)
      .then((data) => {
        const lastRecord = (data.length - 1);
        const recordId = data[lastRecord].id;
        Helpers.returnForSuccess(req, res, 201, recordId, "Created red-flag record");
      });

  }

  /**
   * Creates an intervention record
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  createInterventionRecord(req, res) {
    const { title, comment, location, images, videos } = req.body;
    const { id } = req.userInfo;

    const createObject = { title, comment, type: "intervention", location, images, videos, id };

    query.createIncidentQuery(createObject)
      .then((data) => {
        const lastRecord = (data.length - 1);
        const recordId = data[lastRecord].id;
        Helpers.returnForSuccess(req, res, 201, recordId, "Created intervention record");
      });

  }


  /**
   * Returns all redflag records
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getAllRedflagRecords(req, res) {
    query.getAllRecordsType(req, res, "red-flag");
  }

  /**
   * Returns all intervention records
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getAllInterventionRecords(req, res) {
    query.getAllRecordsType(req, res, "intervention");
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

    query.updateSpecificRecord(req, res, updateArgumentObject);
  }

  /**
   * Updates a specific intervention record's location
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
   * @return {undefined}
   */
  updateInterventionLocation(req, res) {
    const { location } = req.body;
    const recordId = req.params.id;
    const userId = req.userInfo.id;

    const updateArgumentObject = {
      tableName: "incidents",
      recordId,
      userId,
      requestBodyPropertyName: "location",
      requestBodyPropertyValue: location,
      statusCode: 200,
      message: "Updated Intervention record's location"
    };

    query.updateSpecificRecord(req, res, updateArgumentObject);
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

    query.updateSpecificRecord(req, res, updateArgumentObject);
  }

  /**
   * Update a specific intervention record's comment
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  updateInterventionRecordComment(req, res) {
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
      message: "Updated Intervention record's comment"
    };

    query.updateSpecificRecord(req, res, updateArgumentObject);
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

    query.selectQuery("users", "id", userId)
      .then((data) => {
        if (data.length < 1) {
          return Helpers.returnForError(req, res, 404, "admin not found");
        } else if (data[0].isadmin !== true) {
          return Helpers.returnForError(req, res, 403, "not an admin"); }

        query.selectQuery("incidents", "id", incidentsId)
          .then((data2) => {
            if (data2.length < 1) {
              return Helpers.returnForError(req, res, 404, "record not found");
            } else {
              query.statusUpdateQuery(status, incidentsId)
                .then((updatedData) => {
                  const updatedRecordId = updatedData[0].id;
                  if (updatedData[0].type === "red-flag") {
                    Helpers.returnForSuccess(req, res, 200, updatedRecordId, "red-flag record's status updated");
                  } else {
                    Helpers.returnForSuccess(req, res, 200, updatedRecordId, "intervention record's status updated");
                  }
                });
            }
          });
      });
  }

  /**
   * Delete a specific Intervention record
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  deleteInterventionRecord(req, res) {
    const recordId = req.params.id;
    const userId = req.userInfo.id;

    const deleteArgumentObject = {
      tableName: "incidents",
      recordId,
      userId,
      statusCode: 200,
      message: "Intervention record has been deleted"
    };

    query.deleteSpecificRecord(req, res, deleteArgumentObject);
  }


  /**
   * Delete a specific redflag record
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  deleteRedflagRecord(req, res) {
    const recordId = req.params.id;
    const userId = req.userInfo.id;

    const deleteArgumentObject = {
      tableName: "incidents",
      recordId,
      userId,
      statusCode: 200,
      message: "red-flag record has been deleted"
    };

    query.deleteSpecificRecord(req, res, deleteArgumentObject);
  }


  /**
   * Returns specific records
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getSpecificRecord(req, res) {
    const id = req.params.id;
    query.getSpecificRecord(req, res, id);
  }


  /**
   * Returns the status count of red-flag records on the database
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getRedflagStatusCount(req, res) {
    const userId = req.userInfo.id;
    const redflag = "red-flag";

    query.getStatusCount(req, res, userId, redflag);
  }

  /**
   * Returns the status count intervention records on the database
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getInterventionStatusCount(req, res) {
    const userId = req.userInfo.id;
    const intervention = "intervention";

    query.getStatusCount(req, res, userId, intervention);
  }

  /**
   * Returns all intervention records of a specific user
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getSpecificUsersInterventionRecords(req, res) {
    const userId = req.userInfo.id;
    const intervention = "intervention";

    query.getUsersRecords(req, res, userId, intervention);
  }

  /**
   * Returns all intervention records of a specific user
   * @param  {object} req - Contains the body of the request.
   * @param {object} res - Contains the returned response.
   * @return {undefined}
   */
  getSpecificUsersRedflagRecords(req, res) {
    const userId = req.userInfo.id;
    const redflag = "red-flag";

    query.getUsersRecords(req, res, userId, redflag);
  }

}




