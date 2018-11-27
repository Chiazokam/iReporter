import { incidentsDB } from "../dummyDB";

const red_flag_string = "red-flag";

export class Incidents {
	/**Creates a red-flag or intervention record
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	createAnIncidentRecord(req, res){
		const { createdBy, title, comment, type, latitude, longitude, location, images, videos } = req.body;

		let newIncidentId = "";
		const numberOfIncidents = incidentsDB.length;
		let newId = numberOfIncidents + 1;
		let anotherId = incidentsDB[numberOfIncidents-1].id + 1;

		if (anotherId > newId) {
			newIncidentId = anotherId;
		} else if (anotherId < newId) {
			newIncidentId = anotherId;
		} else {
			newIncidentId = newId;
		}

		const newIncident = {
			id: newIncidentId,
			createdBy,
			createdOn: Date(),
			type,
			location,
			longitude,
			latitude,
			status: "Draft",
			images: images,
			videos: videos,
			title,
			comment
		};

		incidentsDB.push(newIncident);

		if (type === red_flag_string) {
			return res.status(201).json({
				status: 201,
				data: [{
					id: newIncidentId,
					message: "Created red-flag record",
				}]
			});
		} else {
			return res.status(201).json({
				status: 201,
				data: [{
					id: newIncidentId,
					message: "Created intervention record",
				}]
			});
		}

	}

	/**Returns all incident records
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	getAllRecords(req, res) {
		return res.status(200).json({
			status: 200,
			data: incidentsDB
		});
	}

	/**Returns all redflag records
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	getAllRedflagRecords(req, res) {
		const allRedFlagsRecords = incidentsDB.filter((redFlag) => redFlag.type === red_flag_string);
		return res.status(200).json({
			status: 200,
			data: allRedFlagsRecords,
		});
	}

	/**Returns a specific redflag record
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	getSpecificRedflagRecord(req, res) {
		const specifiedRedFlagRecordId = parseInt(req.params.id, 10);
		const allRedFlagsRecords = incidentsDB.filter((redFlag) => redFlag.type === red_flag_string);
		const specificRedFlag = allRedFlagsRecords.filter((redFlagId) => redFlagId.id === specifiedRedFlagRecordId);

		return res.status(200).json({
			status: 200,
			data: specificRedFlag,
		});
	}

	/**Updates a specific redflag record's location
    * @param  { object } req - Contains the body of the request.
    * @param { object } res - Contains the returned response.
    */
	updateRedflagRecordLocation(req, res) {
		const { location, createdBy } = req.body;
		const specifiedRedFlagRecordId = parseInt(req.params.id, 10);
		const allRedFlagsRecords = incidentsDB.filter((redFlag) => redFlag.type === red_flag_string);
		const specificRedFlag = allRedFlagsRecords.filter((redFlagId) => redFlagId.id === specifiedRedFlagRecordId);

		if (createdBy !== specificRedFlag[0].createdBy) {
			return res.status(401).json({
				status: 401,
				error: "invalid user"
			});
		}
		specificRedFlag[0].location = location;


		return res.status(200).json({
			status: 200,
			data: [{
				id: specifiedRedFlagRecordId,
				message: "Updated red-flag record's location",
			}]
		});
	}

	/**Update a specific redflag record's comment
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	updateRedflagRecordComment(req, res) {
		const { comment, createdBy } = req.body;
		const specifiedRedFlagRecordId = parseInt(req.params.id, 10);
		const allRedFlagsRecords = incidentsDB.filter((redFlag) => redFlag.type === red_flag_string);
		const specificRedFlag = allRedFlagsRecords.filter((redFlagId) => redFlagId.id === specifiedRedFlagRecordId);

		if (createdBy !== specificRedFlag[0].createdBy) {
			return res.status(401).json({
				status: 401,
				error: "invalid user"
			});
		}
		specificRedFlag[0].comment = comment;


		return res.status(200).json({
			status: 200,
			data: [{
				id: specifiedRedFlagRecordId,
				message: "Updated red-flag record's comment",
			}]
		});
	}

	/**Update a specific redflag record's comment
* @param  { object } req - Contains the body of the request.
* @param { object } res - Contains the returned response.
*/
	deleteRecord(req, res) {
		const { createdBy } = req.body;
		const specifiedRedFlagRecordId = parseInt(req.params.id, 10);
		const allRedFlagsRecords = incidentsDB.filter((redFlag) => redFlag.type === red_flag_string);
		const specificRedFlag = allRedFlagsRecords.filter((redFlagId) => redFlagId.id === specifiedRedFlagRecordId);

		if (createdBy !== specificRedFlag[0].createdBy) {
			return res.status(401).json({
				status: 401,
				error: "invalid user"
			});
		}

		for (let count in incidentsDB) {
			if (incidentsDB[count].id === specifiedRedFlagRecordId) {
				incidentsDB.splice(count, 1);
				return res.status(200).json({
					status: 200,
					data: [{
						id: specifiedRedFlagRecordId,
						message: "red-flag record has been deleted",
					}]
				});
			}
		}
	}
}


