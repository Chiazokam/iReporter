import { incidentsDB } from "../dummyDB";

export class Incidents {
	createIncidentReport(req, res){
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

	getAllReports(req, res){
		return res.status(200).json({
			status: 200,
			data: [{ incidentsDB }]
		});
	}
}

