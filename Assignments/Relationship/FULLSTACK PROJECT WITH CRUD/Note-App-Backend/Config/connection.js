const { connect,set } = require("mongoose");

require("dotenv").config();
set("strictQuery",true)

const { URL, DBNAME } = process.env;

const connection = connect(URL + DBNAME);

module.exports = {connection};
