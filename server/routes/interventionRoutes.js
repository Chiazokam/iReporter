import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, verifyUsersToken } from "../middlewares";

const incident = new Incidents();

const interventionRoutes = express.Router();


/**Create an intervention record */
interventionRoutes.post(
  "/interventions",
  verifyUsersToken,
  PostValidator.multipleStringValidation,
  PostValidator.validateArrayValues,
  PostValidator.isValidIncidentType,
  Helpers.isNotAValidGeolocation,
  incident.createAnIncidentRecord
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
  incident.getSpecificRecord
);

/**Update an intervention record location*/
interventionRoutes.patch(
  "/interventions/:id/location",
  verifyUsersToken,
  PostValidator.locationStringValidation,
  Helpers.isNotAValidGeolocation,
  incident.updateInterventionLocation
);

/**Update an intervention record comment*/
interventionRoutes.patch(
  "/interventions/:id/comment",
  verifyUsersToken,
  PostValidator.commentStringValidation,
  incident.updateInterventionRecordComment
);

/**Delete an intervention record */
interventionRoutes.delete(
  "/interventions/:id",
  verifyUsersToken,
  incident.deleteInterventionRecord
);

/**Update an intervention record status*/
interventionRoutes.patch(
  "/interventions/:id/status",
  verifyUsersToken,
  PostValidator.validateStatus,
  incident.updateIncidentsStatus
);


export default interventionRoutes;


