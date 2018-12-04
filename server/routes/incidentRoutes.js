import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";

import {
	multipleStringValidation,
	locationStringValidation,
	isDummyDbEmpty,
	isUser,
	isRedFlag,
	doesRedFlagRecordExist,
	doesSpecificRedFlagIdRecordExist,
	commentStringValidation } from "../middlewares";

const incident = new Incidents();

const incidentRoutes = express.Router();

/**Fetch all incident record */
incidentRoutes.get("/incidents", isDummyDbEmpty, incident.getAllRecords);

/**Create a red-flag record */
incidentRoutes.post("/red-flags", isUser, multipleStringValidation, isRedFlag, Helpers.isNotAValidGeolocation, incident.createAnIncidentRecord);

/**Fetch all red-flag records */
incidentRoutes.get("/red-flags", doesRedFlagRecordExist, incident.getAllRedflagRecords);

/**Fetch a red-flag record */
incidentRoutes.get("/red-flags/:id", doesSpecificRedFlagIdRecordExist, incident.getSpecificRedflagRecord);

/**Update a red-flag record location*/
incidentRoutes.patch("/red-flags/:id/location", isUser, locationStringValidation, Helpers.isNotAValidGeolocation, doesSpecificRedFlagIdRecordExist, incident.updateRedflagRecordLocation);

/**Update a red-flag record comment*/
incidentRoutes.patch("/red-flags/:id/comment", isUser, commentStringValidation, doesSpecificRedFlagIdRecordExist, incident.updateRedflagRecordComment);

/**Delete a red-flag record comment*/
incidentRoutes.delete("/red-flags/:id", isUser, doesSpecificRedFlagIdRecordExist, incident.deleteRecord);

export default incidentRoutes;


