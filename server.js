import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

import { incidentRoutes, userRoutes } from "./server/routes";

const port = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

app.use("/api/v1/red-flags", incidentRoutes);
app.use("/api/v1", userRoutes);

app.get("*", (req, res) => {
	return res.status(200).json({
		status: 200,
		data: [{ message: "welcome to ireporter" }]
	});
});

app.listen(port, () => {
	console.log(`Listening On Port ${port}`);
});

export default app;



