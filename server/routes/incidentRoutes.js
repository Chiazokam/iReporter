import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, GetValidator} from "../middlewares";

const incident = new Incidents();

const incidentRoutes = express.Router();

/**Create a red-flag record */
incidentRoutes.post("/", Helpers.verifyUsersToken, PostValidator.multipleStringValidation, PostValidator.validateArrayValues, PostValidator.isRedFlag, Helpers.isNotAValidGeolocation, incident.createAnIncidentRecord);

/**Fetch all red-flag records */
incidentRoutes.get("/", Helpers.verifyUsersToken, GetValidator.doesRedFlagRecordExist, incident.getAllRedflagRecords);

/**Fetch specific red-flag record */                      /** Remaining */
incidentRoutes.get("/:id", GetValidator.doesSpecificRedFlagIdRecordExist, incident.getSpecificRedflagRecord);

/**Update a red-flag record location*/
incidentRoutes.patch("/:id/location", Helpers.verifyUsersToken, PostValidator.locationStringValidation, Helpers.isNotAValidGeolocation, incident.updateRedflagRecordLocation);

/**Update a red-flag record comment*/
incidentRoutes.patch("/:id/comment", Helpers.verifyUsersToken, PostValidator.commentStringValidation, incident.updateRedflagRecordComment);

/**Update a red-flag record comment*/
incidentRoutes.patch("/:id/comment", Helpers.verifyUsersToken, PostValidator.commentStringValidation, incident.updateRedflagRecordComment);

/**Delete a red-flag record comment*/                   /** Remaining this */
incidentRoutes.delete("/:id", PostValidator.isUser, GetValidator.doesSpecificRedFlagIdRecordExist, incident.deleteRecord);

export default incidentRoutes;




