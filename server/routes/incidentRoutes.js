import express from "express";
import { Incidents } from "../controllers";

const newIncident = new Incidents();

const incidentRoutes = express.Router();


incidentRoutes.post("/api/v1/incident", newIncident.createIncidentReport);


export default incidentRoutes;

