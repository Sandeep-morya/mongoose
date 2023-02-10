const { Schema } = require("mongoose");

const todoSchema = Schema(
	{
		title: { type: String, required: true },
		isCompleted: { type: Boolean, required: true },
	},
	{
		versionKey: false,
	},
);

module.exports = {
	todoSchema,
};
