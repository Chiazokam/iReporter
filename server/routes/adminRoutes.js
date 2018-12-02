import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator } from "../middlewares";

const incident = new Incidents();

const adminRoutes = express.Router();


/**Delete a red-flag record comment*/
adminRoutes.patch("/incidents/:id/status", Helpers.verifyUsersToken, PostValidator.validateStatus, incident.updateIncidentsStatus);

export default adminRoutes;


