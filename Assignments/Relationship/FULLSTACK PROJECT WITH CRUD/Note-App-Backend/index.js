const express = require("express");
const cors = require("cors");
/* Improt connection file from config */
const {connection} = require("./Config/connection");

/* Import All Routes */
const { userRoute } = require("./Routes/user.route");
const {noteRoute} = require("./Routes/note.route")

const app = express();
const PORT = 8080;

/* Compulsory Middlewares */
app.use(cors());
app.use(express.json());

/* Use All Routes as Middleware*/
app.use("/api/user", userRoute);
app.use("/api/notes",noteRoute)

/* Server Engine Control */
app.listen(PORT, async () => {
	console.log("server is running on Port " + PORT);
	try {
		await connection;
		console.log("database connection establised");
	} catch (error) {
		console.log("unabele to make connection with database");
	}
});
