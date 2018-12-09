import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, GetValidator} from "../middlewares";

const incident = new Incidents();

const redFlagRoutes = express.Router();               //break all

/**Create a red-flag record */
redFlagRoutes.post(
  "/red-flags",
  Helpers.verifyUsersToken,
  PostValidator.multipleStringValidation,
  PostValidator.validateArrayValues,
  PostValidator.isRedFlag,
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

/**Fetch specific red-flag record */                      /** Remaining this*/
redFlagRoutes.get(
  "/red-flags/:id",
  GetValidator.doesSpecificRedFlagIdRecordExist,
  incident.getSpecificRedflagRecord
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

/**Delete a red-flag record */                           /** Remaining this */
redFlagRoutes.delete(
  "/red-flags/:id",
  PostValidator.isUser,
  GetValidator.doesSpecificRedFlagIdRecordExist,
  incident.deleteRecord
);

/**Update a red-flag record status*/
redFlagRoutes.patch(
  "/red-flags/:id/status",
  Helpers.verifyUsersToken,
  PostValidator.validateStatus,
  incident.updateIncidentsStatus
);




export default redFlagRoutes;




