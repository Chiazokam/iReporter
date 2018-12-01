import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, GetValidator} from "../middlewares";

const incident = new Incidents();

const incidentRoutes = express.Router();

/**Create a red-flag record */
incidentRoutes.post("/", Helpers.verifyUsersToken, PostValidator.multipleStringValidation, PostValidator.validateArrayValues, PostValidator.isRedFlag, Helpers.isNotAValidGeolocation, incident.createAnIncidentRecord);

/**Fetch all red-flag records */
incidentRoutes.get("/", GetValidator.doesRedFlagRecordExist, incident.getAllRedflagRecords);

/**Fetch a red-flag record */
incidentRoutes.get("/:id", GetValidator.doesSpecificRedFlagIdRecordExist, incident.getSpecificRedflagRecord);

/**Update a red-flag record location*/
incidentRoutes.patch("/:id/location", PostValidator.isUser, PostValidator.locationStringValidation, Helpers.isNotAValidGeolocation, GetValidator.doesSpecificRedFlagIdRecordExist, incident.updateRedflagRecordLocation);

/**Update a red-flag record comment*/
incidentRoutes.patch("/:id/comment", PostValidator.isUser, PostValidator.commentStringValidation, GetValidator.doesSpecificRedFlagIdRecordExist, incident.updateRedflagRecordComment);

/**Delete a red-flag record comment*/
incidentRoutes.delete("/:id", PostValidator.isUser, GetValidator.doesSpecificRedFlagIdRecordExist, incident.deleteRecord);

export default incidentRoutes;


