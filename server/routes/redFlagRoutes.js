import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, verifyUsersToken, sendEmail } from "../middlewares";

const incident = new Incidents();

const redFlagRoutes = express.Router();

/**Create a red-flag record */
redFlagRoutes.post(
  "/red-flags",
  verifyUsersToken,
  PostValidator.multipleStringValidation,
  PostValidator.validateArrayValues,
  Helpers.isNotAValidGeolocation,
  incident.createRedflagRecord
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
  PostValidator.validateParams,
  incident.getSpecificRecord
);

/**Get red-flag records status count numbers*/
redFlagRoutes.get(
  "/red-flags/profile/status",
  verifyUsersToken,
  incident.getRedflagStatusCount
);

/**Get all red-flag records of a specific user*/
redFlagRoutes.get(
  "/profile/red-flags",
  verifyUsersToken,
  incident.getSpecificUsersRedflagRecords
);

/**Update a red-flag record location*/
redFlagRoutes.patch(
  "/red-flags/:id/location",
  verifyUsersToken,
  PostValidator.validateParams,
  PostValidator.locationStringValidation,
  Helpers.isNotAValidGeolocation,
  incident.updateRedflagRecordLocation
);

/**Update a red-flag record comment*/
redFlagRoutes.patch(
  "/red-flags/:id/comment",
  verifyUsersToken,
  PostValidator.validateParams,
  PostValidator.commentStringValidation,
  incident.updateRedflagRecordComment
);

/**Delete a red-flag record */
redFlagRoutes.delete(
  "/red-flags/:id",
  verifyUsersToken,
  PostValidator.validateParams,
  incident.deleteRedflagRecord
);

/**Update a red-flag record status*/
redFlagRoutes.patch(
  "/red-flags/:id/status",
  verifyUsersToken,
  PostValidator.validateParams,
  PostValidator.validateStatus,
  incident.updateIncidentsStatus,
  sendEmail
);




export default redFlagRoutes;




