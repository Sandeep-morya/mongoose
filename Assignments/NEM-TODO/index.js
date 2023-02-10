const express = require("express");
const { PORT, connection } = require("./db/mongo");
const morgan = require("morgan");

const todoRoute = require("./routes");

const app = express();
app.use(morgan("dev"));
app.use(express.static("public/"));
app.use(express.json());

/* Routes */
app.use("/todos", todoRoute);

app.listen(PORT, async () => {
	console.log(`Server Started on Port ${PORT}`);
	try {
		await connection;
	} catch (error) {
		console.log(" But unable to make connection with 'Database'");
	}
});
