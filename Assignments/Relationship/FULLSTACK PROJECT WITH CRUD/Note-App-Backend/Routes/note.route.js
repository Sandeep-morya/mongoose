const { Router } = require("express");
const { NoteModel } = require("../Config/model/note.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { KEY } = process.env;

const noteRoute = Router();

/* Middleware */
noteRoute.use((req, res, next) => {
	const token = req.headers.authorization;

	try {
		if (!token) throw new Error();

		const data = jwt.verify(token, KEY);
		/* If token not verified it automaticaly goes in catch */
		req.body.userID = data.user._id;
		
		next();
	} catch (error) {
		res.status(405).send("not allowed");
	}
});

/* All Note Routes  👇👇👇👇👇*/

/* Create */
noteRoute.post("/", async (req, res) => {
	try {
		const note = new NoteModel(req.body);
		const data = await note.save();
		res.status(201).send({ message: "note created succesfull", data });
	} catch (error) {
		res.status(401).send({ error });
	}
});


/* Read */
noteRoute.get("/", async (req, res) => {
	const { userID } = req.body;
	try {
		const notes = await NoteModel.find({ userID });
		res.send({ notes });
	} catch (error) {
		res.status(401).send({ error });
	}
});

/* Update */
noteRoute.patch("/:id", async (req, res) => {
	const _id = req.params.id;
	const { userID } = req.body;
	try {
		const data = await NoteModel.findOneAndUpdate({ _id, userID }, req.body, {
			returnOriginal: false,
		});
		if (!data) throw new Error();
		res.status(201).send({ message: "succesfully Updated", data });
	} catch (error) {
		res.status(401).send({ error });
	}
});

/* Delete */
noteRoute.delete("/:id", async (req, res) => {
	const _id = req.params.id;
	const { userID } = req.body;
	try {
		const data = await NoteModel.findOneAndDelete({ _id, userID });
		if (!data) throw new Error("Parameter is not a number!");
		res.status(201).send({ message: "succesfully Deleted", data });
	} catch (error) {
		res.status(404).send({ error });
	}
});

module.exports = { noteRoute };
