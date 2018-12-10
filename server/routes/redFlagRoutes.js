import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, GetValidator} from "../middlewares";

const incident = new Incidents();

const redFlagRoutes = express.Router();

/**Create a red-flag record */
redFlagRoutes.post(
  "/red-flags",
  Helpers.verifyUsersToken,
  PostValidator.multipleStringValidation,
  PostValidator.validateArrayValues,
  PostValidator.isValidIncidentType,
  Helpers.isNotAValidGeolocation,
  incident.createAnIncidentRecord
);

/**Fetch all red-flag records */
redFlagRoutes.get(
  "/red-flags",
  Helpers.verifyUsersToken,
  GetValidator.doesRedFlagRecordExist,
  incident.getAllRedflagRecords
);

/**Get red-flag records status count numbers*/
redFlagRoutes.get(
  "/red-flags/createdby/:id/status",
  Helpers.verifyUsersToken,
  incident.getRedflagStatusCount
);

/**Fetch specific red-flag record */
redFlagRoutes.get(
  "/red-flags/:id",
  Helpers.verifyUsersToken,
  incident.getSpecificRecord
);

/**Update a red-flag record location*/
redFlagRoutes.patch(
  "/red-flags/:id/location",
  Helpers.verifyUsersToken,
  PostValidator.locationStringValidation,
  Helpers.isNotAValidGeolocation,
  incident.updateRedflagRecordLocation
);

/**Update a red-flag record comment*/
redFlagRoutes.patch(
  "/red-flags/:id/comment",
  Helpers.verifyUsersToken,
  PostValidator.commentStringValidation,
  incident.updateRedflagRecordComment
);

/**Delete a red-flag record */
redFlagRoutes.delete(
  "/red-flags/:id",
  Helpers.verifyUsersToken,
  incident.deleteRedflagRecord
);

/**Update a red-flag record status*/
redFlagRoutes.patch(
  "/red-flags/:id/status",
  Helpers.verifyUsersToken,
  PostValidator.validateStatus,
  incident.updateIncidentsStatus
);




export default redFlagRoutes;




