import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, GetValidator} from "../middlewares";

const incident = new Incidents();

const incidentRoutes = express.Router();

/**Fetch all incident record */
incidentRoutes.get("/incidents", GetValidator.isDummyDbEmpty, incident.getAllRecords);

/**Create a red-flag record */
incidentRoutes.post("/red-flags", PostValidator.isUser, PostValidator.multipleStringValidation, PostValidator.validateArrayValues, PostValidator.isRedFlag, Helpers.isNotAValidGeolocation, incident.createAnIncidentRecord);

/**Fetch all red-flag records */
incidentRoutes.get("/red-flags", GetValidator.doesRedFlagRecordExist, incident.getAllRedflagRecords);

/**Fetch a red-flag record */
incidentRoutes.get("/red-flags/:id", GetValidator.doesSpecificRedFlagIdRecordExist, incident.getSpecificRedflagRecord);

/**Update a red-flag record location*/
incidentRoutes.patch("/red-flags/:id/location", PostValidator.isUser, PostValidator.locationStringValidation, Helpers.isNotAValidGeolocation, GetValidator.doesSpecificRedFlagIdRecordExist, incident.updateRedflagRecordLocation);

/**Update a red-flag record comment*/
incidentRoutes.patch("/red-flags/:id/comment", PostValidator.isUser, PostValidator.commentStringValidation, GetValidator.doesSpecificRedFlagIdRecordExist, incident.updateRedflagRecordComment);

/**Delete a red-flag record comment*/
incidentRoutes.delete("/red-flags/:id", PostValidator.isUser, GetValidator.doesSpecificRedFlagIdRecordExist, incident.deleteRecord);

export default incidentRoutes;


