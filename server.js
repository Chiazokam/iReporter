import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

import { redFlagRoutes, signupSigninRoutes, interventionRoutes } from "./server/routes";

const port = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));


app.use("/api/v1", redFlagRoutes, signupSigninRoutes, interventionRoutes);

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



