import express from "express";
import { Incidents } from "../controllers";
import { reportValidation, isDummyDbEmpty, isUser, isRedFlag, doesRedFlagRecordExist } from "../middlewares";

const incident = new Incidents();

const incidentRoutes = express.Router();

incidentRoutes.get("/api/v1/incidents", isDummyDbEmpty, incident.getAllRecords);
incidentRoutes.post("/api/v1/red-flags", isUser, reportValidation, isRedFlag, incident.createAnIncidentRecord);
incidentRoutes.get("/api/v1/red-flags", doesRedFlagRecordExist, incident.getAllRedflagRecords);


export default incidentRoutes;

