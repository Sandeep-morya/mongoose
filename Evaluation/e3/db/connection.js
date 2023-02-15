const { connect,set} = require("mongoose");

require("dotenv").config();
set("strictQuery", true);

const { URL, DBNAME, QUERY, PORT } = process.env;

module.exports = {
	PORT,
	connection: connect(URL + DBNAME + QUERY),
};
