const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ versionKey: false },
);
/* This plugin send a error message if any duplicate value is provided
/* for make it work: it is important to use "unique:true"
 */
userSchema.plugin(uniqueValidator);

const UserModel = model("user",userSchema);

module.exports = {UserModel}