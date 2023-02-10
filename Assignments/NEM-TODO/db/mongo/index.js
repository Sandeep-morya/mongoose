const { connect, set } = require("mongoose");


set("strictQuery", false);
require("dotenv").config();

const { URL, DBNAME, QUERY, PORT } = process.env;

module.exports = {
	PORT,
	connection: connect(URL + DBNAME + QUERY),
};
