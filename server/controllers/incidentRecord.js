import { incidentsDB } from "../dummyDB";
import { Helpers } from "../helpers/predefinedMethods";
import { db } from "../database";

const red_flag_string = "red-flag";

let specifiedRedFlagRecordId = "";
let allRedFlagsRecords = "";
let specificRedFlag = "";

export class Incidents {
	/**filter Incident Record(s)
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	static filterRecords (req, res, incident_record) {
		specifiedRedFlagRecordId = parseInt(req.params.id, 10);
		allRedFlagsRecords = incidentsDB.filter((redFlag) => redFlag.type === incident_record);
		specificRedFlag = allRedFlagsRecords.filter((redFlagId) => redFlagId.id === specifiedRedFlagRecordId);

		return [specifiedRedFlagRecordId, allRedFlagsRecords, specificRedFlag];
	}


	/**Creates a red-flag or intervention record
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	createAnIncidentRecord(req, res){
		const { title, comment, type, location, images, videos } = req.body;
		const { id } = req.userInfo; //userId

		db.any("INSERT INTO incidents(title, comment, type, location, images, videos, status, createdBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [title, comment, type, location, images.join(" , "), videos.join(" , "), "draft", id])
			.then(() => {
				db.any("SELECT * FROM incidents WHERE createdBy = $1", [id])
					.then((data) => {
						const lastRecord = (data.length - 1);
						const recordId = data[lastRecord].id;
						Helpers.returnForSuccess(req, res, 201, recordId, "Created red-flag record");
					});
			});

	}


	/**Returns all redflag records
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	getAllRedflagRecords(req, res) {
		db.any("SELECT * FROM incidents WHERE type = $1", ["red-flag"])
			.then((data) => {
				Helpers.returnSuccessForGET(req, res, 200, data);
			});
	}

	/**Returns a specific redflag record
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	getSpecificRedflagRecord(req, res) {
		Incidents.filterRecords(req, res, red_flag_string);

		Helpers.returnSuccessForGET(req, res, 200, specificRedFlag);
	}

	/**Updates a specific redflag record's location
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	updateRedflagRecordLocation(req, res) {
		const { location } = req.body;
		const recordId = req.params.id;
		const userId = req.userInfo.id;

		Helpers.updateSpecificRecord(req, res, "incidents", recordId, userId, "location", location, 200, "Updated red-flag record's location");
	}

	/**Update a specific redflag record's comment
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	updateRedflagRecordComment(req, res) {
		const { comment } = req.body;
		const recordId = req.params.id;
		const userId = req.userInfo.id;

		Helpers.updateSpecificRecord(req, res, "incidents", recordId, userId, "comment", comment, 200, "Updated red-flag record's comment");
	}


	/**
   * Update incident record
   * @param  { object } req - Contains the body of the request.
   * @param { object } res - Contains the returned response.
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
					return Helpers.returnForError(req, res, 400, "not an admin"); }

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




	/**Delete a specific redflag record's record
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	deleteRecord(req, res) {
		const { createdBy } = req.body;

		Incidents.filterRecords(req, res, red_flag_string);

		if (createdBy !== specificRedFlag[0].createdBy) {
			return Helpers.returnForError(req, res, 401, "invalid user");
		}

		for (let count in incidentsDB) {
			if (incidentsDB[count].id === specifiedRedFlagRecordId) {
				incidentsDB.splice(count, 1);
				return Helpers.returnForSuccess(req, res, 200, specifiedRedFlagRecordId, "red-flag record has been deleted");
			}
		}
	}
}




