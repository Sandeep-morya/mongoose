const express = require("express");
const { PORT, connection } = require("./db/connection");
const app = express();

/* user-defined middlewares import */
const fieldsAnalyzer = require("./middlewares/fieldsAnalyzer");
const record = require("./middlewares/record");

/* routes import */
const foodRoute = require("./routes/food")


/* Predefined middlewares */
app.use(express.static("public"));
app.use(express.json());

/* user-defined middlewares */
app.use(fieldsAnalyzer);
app.use(record);

/* routes */
app.use("/food",foodRoute);


/* Server Engine Manager 😁 */
app.listen(PORT, async () => {
	console.log("server is running on PORT: " + PORT);
	try {
		await connection;
		console.log("Connected to DataBase");
	} catch (error) {
		console.log("But unable to make connection with database");
	}
});
