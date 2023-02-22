const { Schema, model } = require("mongoose");

const noteSchema = Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
		userID: { type: String, required: true },
	},
	{ versionKey: false },
);

const NoteModel = model("note", noteSchema);

module.exports = { NoteModel };
