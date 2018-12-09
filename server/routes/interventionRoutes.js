import express from "express";
// import { Helpers } from "../helpers";
// import { Incidents } from "../controllers";
// import { PostValidator } from "../middlewares";

// const incident = new Incidents();

const interventionRoutes = express.Router();


/**Create an intervention record */
interventionRoutes.post("/interventions");

/**Fetch all intervention records */
interventionRoutes.get("/interventions");

/**Fetch specific intervention record */
interventionRoutes.get("/interventions/:id");

/**Update an intervention record location*/
interventionRoutes.patch("/interventions/:id/location");

/**Update an intervention record comment*/
interventionRoutes.patch("/interventions/:id/comment");

/**Delete an intervention record */
interventionRoutes.delete("/interventions/:id");

/**Update an intervebtion record status*/
interventionRoutes.patch("/interventions/:id/status");


export default interventionRoutes;


