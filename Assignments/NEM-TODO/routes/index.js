const { Router } = require("express");
const { TodoModel } = require("../db/model");

const todo = Router();

// todo.get("/", async (req, res) => {
// 	try {
// 		const data = await TodoModel.find(req.query);
// 		res.status(200).send(data);
// 	} catch (error) {
// 		res.status(503).send(err.message);
// 	}
// });
/* ----------- OR ----------- */

todo.get("/", (req, res) => {
	TodoModel.find(req.query).exec((err, data) => {
		if (err) {
			res.status(404).send(err.message);
		} else {
			res.status(200).send(data);
		}
	});
});

todo.get("/:id", (req, res) => {
    const _id = req.params.id;
	TodoModel.findById({_id}).exec((err, data) => {
		if (err) {
			res.status(404).send(err.message);
		} else {
			res.status(200).send(data);
		}
	});
});

todo.post("/", (req, res) => {
	const todo = new TodoModel(req.body);
	todo.save((err, user) => {
		if (err) {
			res.status(404).send(err.message);
		} else {
			res.status(201).send(user);
		}
	});
});

todo.patch("/:id", (req, res) => {
	const _id = req.params.id;
	TodoModel.findByIdAndUpdate({ _id }, req.body).exec((err, data) => {
		if (err) {
			res.status(404).send(err.message);
		} else {
			res.json({ ...data?._doc, ...req.body });
		}
	});
});

todo.put("/:id", (req, res) => {
	const _id = req.params.id;
	TodoModel.findByIdAndUpdate({ _id }, req.body).exec((err, data) => {
		if (err) {
			res.status(404).send(err.message);
		} else {
			res.status(200).send({ ...data?._doc, ...req.body });
		}
	});
});

todo.delete("/:id", (req, res) => {
	const _id = req.params.id;
	TodoModel.findByIdAndDelete({ _id }).exec((err, data) => {
		if (err) {
			res.status(404).send(err.message);
		} else {
			res.send(data);
		}
	});
});

module.exports = todo;
