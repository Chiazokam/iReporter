import express from "express";
import { Incidents } from "../controllers";
import { reportValidation, isDummyDbEmpty, isUser, isRedFlag } from "../middlewares";

const incident = new Incidents();

const incidentRoutes = express.Router();

incidentRoutes.get("/api/v1/incidents", isDummyDbEmpty, incident.getAllReports);
incidentRoutes.post("/api/v1/red-flags", isUser, reportValidation, isRedFlag, incident.createIncidentReport);


export default incidentRoutes;

