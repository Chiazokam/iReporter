import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, verifyUsersToken } from "../middlewares";

const incident = new Incidents();

const redFlagRoutes = express.Router();

/**Create a red-flag record */
redFlagRoutes.post(
  "/red-flags",
  verifyUsersToken,
  PostValidator.multipleStringValidation,
  PostValidator.validateArrayValues,
  PostValidator.isValidIncidentType,
  Helpers.isNotAValidGeolocation,
  incident.createAnIncidentRecord
);

/**Fetch all red-flag records */
redFlagRoutes.get(
  "/red-flags",
  verifyUsersToken,
  incident.getAllRedflagRecords
);

/**Fetch specific red-flag record */
redFlagRoutes.get(
  "/red-flags/:id",
  verifyUsersToken,
  incident.getSpecificRecord
);

/**Update a red-flag record location*/
redFlagRoutes.patch(
  "/red-flags/:id/location",
  verifyUsersToken,
  PostValidator.locationStringValidation,
  Helpers.isNotAValidGeolocation,
  incident.updateRedflagRecordLocation
);

/**Update a red-flag record comment*/
redFlagRoutes.patch(
  "/red-flags/:id/comment",
  verifyUsersToken,
  PostValidator.commentStringValidation,
  incident.updateRedflagRecordComment
);

/**Delete a red-flag record */
redFlagRoutes.delete(
  "/red-flags/:id",
  verifyUsersToken,
  incident.deleteRedflagRecord
);

/**Update a red-flag record status*/
redFlagRoutes.patch(
  "/red-flags/:id/status",
  verifyUsersToken,
  PostValidator.validateStatus,
  incident.updateIncidentsStatus
);




export default redFlagRoutes;




