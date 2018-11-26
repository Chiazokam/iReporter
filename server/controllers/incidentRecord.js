import { incidentsDB } from "../dummyDB";

export class Incidents {
	/**Creates a red-flag or intervention record
  * @param  { object } req - Contains the body of the request.
  * @param { object } res - Contains the returned response.
  */
	createAnIncidentRecord(req, res){
		const { createdBy, title, comment, type, latitude, longitude, location, images, videos } = req.body;

		const numberOfIncidents = incidentsDB.length;
		const newIncidentId = numberOfIncidents + 1;

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

		if (type === "red-flag") {
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
		const allRedFlagsRecords = incidentsDB.filter((redFlag) => redFlag.type === "red-flag");
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
		const allRedFlagsRecords = incidentsDB.filter((redFlag) => redFlag.type === "red-flag");
		const specificRedFlag = allRedFlagsRecords.filter((redFlagId) => redFlagId.id === specifiedRedFlagRecordId);

		return res.status(200).json({
			status: 200,
			data: specificRedFlag,
		});
	}

}


