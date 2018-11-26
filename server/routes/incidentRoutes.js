import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import {
  multipleStringValidation, singleStringValidation, isDummyDbEmpty, isUser, isRedFlag,
	doesRedFlagRecordExist, doesSpecificRedFlagIdRecordExist } from "../middlewares";

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
incidentRoutes.patch("/red-flags/:id/location", isUser, singleStringValidation, Helpers.isNotAValidGeolocation, doesSpecificRedFlagIdRecordExist, incident.updateRedflagRecordLocation);

export default incidentRoutes;

