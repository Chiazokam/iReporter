import express from "express";
import { Incidents } from "../controllers";
import { reportValidation, isDummyDbEmpty, isUser, isRedFlag,
	doesRedFlagRecordExist, doesSpecificRedFlagIdRecordExist } from "../middlewares";

const incident = new Incidents();

const incidentRoutes = express.Router();

/**Fetch all incident record */
incidentRoutes.get("/incidents", isDummyDbEmpty, incident.getAllRecords);

/**Create a red-flag record */
incidentRoutes.post("/red-flags", isUser, reportValidation, isRedFlag, incident.createAnIncidentRecord);

/**Fetch all red-flag records */
incidentRoutes.get("/red-flags", doesRedFlagRecordExist, incident.getAllRedflagRecords);

/**Fetch a red-flag record */
incidentRoutes.get("/red-flags/:id", doesSpecificRedFlagIdRecordExist, incident.getSpecificRedflagRecord);

export default incidentRoutes;

