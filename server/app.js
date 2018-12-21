import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import apiDocs from "../apiDocs.json";

import { verifyUsersToken } from "./middlewares";

import { redFlagRoutes, authRoutes, interventionRoutes, profileRoutes } from "./routes";

const port = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));

// Enable All CORS Requests
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000", "https://eye-reporter.herokuapp.com", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, " +
    "Authorization, Access-Control-Allow-Credentials"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Serve documentation for API
app.use("/api-documentation", swaggerUI.serve, swaggerUI.setup(apiDocs));

//Secure WEB pages
app.use("/api/v1/auth/secure-pages", verifyUsersToken, (req, res) => res.status(200).json({message: "valid user"}));

//Serve HTML pages
app.use("/", express.static("ui"));
app.use("/html/home", express.static("ui/html/home.html"));
app.use("/html/about", express.static("ui/html/about.html"));
app.use("/html/howitworks", express.static("ui/html/howitworks.html"));
app.use("/html/admin", express.static("ui/html/admin.html"));
app.use("/html/profile", express.static("ui/html/profile.html"));
app.use("/html/report", express.static("ui/html/report.html"));


app.use("/api/v1", redFlagRoutes, authRoutes, interventionRoutes, profileRoutes);

//Serves the 404 page
app.use("*", express.static("ui/html/404.html"));

app.listen(port, () => {
  console.log(`Listening On Port ${port}`);
});

export default app;
