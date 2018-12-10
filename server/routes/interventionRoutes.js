import express from "express";
import { Helpers } from "../helpers";
import { Incidents } from "../controllers";
import { PostValidator, GetValidator } from "../middlewares";

const incident = new Incidents();

const interventionRoutes = express.Router();


/**Create an intervention record */
interventionRoutes.post(
  "/interventions",
  Helpers.verifyUsersToken,
  PostValidator.multipleStringValidation,
  PostValidator.validateArrayValues,
  PostValidator.isValidIncidentType,
  Helpers.isNotAValidGeolocation,
  incident.createAnIncidentRecord
);

/**Fetch all intervention records */
interventionRoutes.get(
  "/interventions",
  Helpers.verifyUsersToken,
  GetValidator.doesInterventionRecordExist,
  incident.getAllInterventionRecords);

/**Fetch specific intervention record */
interventionRoutes.get(
  "/interventions/:id",
  Helpers.verifyUsersToken,
  incident.getSpecificRecord
);

/**Get intervention records status count number*/
interventionRoutes.get(
  "/interventions/createdby/:id/status",
  Helpers.verifyUsersToken,
  incident.getInterventionStatusCount
);

/**Update an intervention record location*/
interventionRoutes.patch(
  "/interventions/:id/location",
  Helpers.verifyUsersToken,
  PostValidator.locationStringValidation,
  Helpers.isNotAValidGeolocation,
  incident.updateInterventionLocation
);

/**Update an intervention record comment*/
interventionRoutes.patch(
  "/interventions/:id/comment",
  Helpers.verifyUsersToken,
  PostValidator.commentStringValidation,
  incident.updateInterventionRecordComment
);

/**Delete an intervention record */
interventionRoutes.delete(
  "/interventions/:id",
  Helpers.verifyUsersToken,
  incident.deleteInterventionRecord
);

/**Update an intervention record status*/
interventionRoutes.patch(
  "/interventions/:id/status",
  Helpers.verifyUsersToken,
  PostValidator.validateStatus,
  incident.updateIncidentsStatus
);


export default interventionRoutes;


