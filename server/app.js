import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import apiDocs from "../apiDocs.json";

import { redFlagRoutes, authRoutes, interventionRoutes, profileRoutes } from "./routes";

const port = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));

// Enable All CORS Requests
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

// Serve documentation for API
app.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(apiDocs));


app.use("/api/v1", redFlagRoutes, authRoutes, interventionRoutes, profileRoutes);


app.get("*", (req, res) => {
  res.status(200).json({
    status: 200,
    data: [{
      message: "welcome to ireporter"
    }]
  });
});

app.listen(port, () => {
  console.log(`Listening On Port ${port}`);
});

export default app;
