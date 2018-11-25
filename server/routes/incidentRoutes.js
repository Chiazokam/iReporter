import express from "express";
import { Incidents } from "../controllers";
import { reportValidation, isDummyDbEmpty } from "../middlewares";

const incident = new Incidents();

const incidentRoutes = express.Router();

incidentRoutes.get("/api/v1/incident", isDummyDbEmpty, incident.getAllReports);
incidentRoutes.post("/api/v1/incident", reportValidation, incident.createIncidentReport);


export default incidentRoutes;

