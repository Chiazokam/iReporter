import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, verifyUsersToken, sendEmail } from "../middlewares";

const incident = new Incidents();

const interventionRoutes = express.Router();


/**Create an intervention record */
interventionRoutes.post(
  "/interventions",
  verifyUsersToken,
  PostValidator.multipleStringValidation,
  PostValidator.validateArrayValues,
  Helpers.isNotAValidGeolocation,
  incident.createInterventionRecord
);

/**Fetch all intervention records */
interventionRoutes.get(
  "/interventions",
  verifyUsersToken,
  incident.getAllInterventionRecords);

/**Fetch specific intervention record */
interventionRoutes.get(
  "/interventions/:id",
  verifyUsersToken,
  PostValidator.validateParams,
  incident.getSpecificRecord
);

/**Get intervention records status count number*/
interventionRoutes.get(
  "/interventions/profile/status",
  verifyUsersToken,
  incident.getInterventionStatusCount
);

/**Get all intervention records of a specific user*/
interventionRoutes.get(
  "/profile/interventions",
  verifyUsersToken,
  incident.getSpecificUsersInterventionRecords
);

/**Update an intervention record location*/
interventionRoutes.patch(
  "/interventions/:id/location",
  verifyUsersToken,
  PostValidator.validateParams,
  PostValidator.locationStringValidation,
  Helpers.isNotAValidGeolocation,
  incident.updateInterventionLocation
);

/**Update an intervention record comment*/
interventionRoutes.patch(
  "/interventions/:id/comment",
  verifyUsersToken,
  PostValidator.validateParams,
  PostValidator.commentStringValidation,
  incident.updateInterventionRecordComment
);

/**Delete an intervention record */
interventionRoutes.delete(
  "/interventions/:id",
  verifyUsersToken,
  PostValidator.validateParams,
  incident.deleteInterventionRecord
);

/**Update an intervention record status*/
interventionRoutes.patch(
  "/interventions/:id/status",
  verifyUsersToken,
  PostValidator.validateParams,
  PostValidator.validateStatus,
  incident.updateIncidentsStatus,
  sendEmail
);


export default interventionRoutes;


