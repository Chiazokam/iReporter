import { incidentsDB } from "../dummyDB";

export class Incidents {
	createIncidentReport(req, res){
		const { title, comment, type, latitude, longitude, location, images, videos } = req.body;

    console.log(title, comment, type, latitude, longitude, location, images, videos);

    const numberOfIncidents = incidentsDB.length;
		const newIncidentId = numberOfIncidents + 1;

		const newIncident = {
			id: newIncidentId,
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

		return res.status(201).json({
			status: 201,
			data: [{
				newIncident,
				message: "Incident record created"
			}]
		});
	}
}

