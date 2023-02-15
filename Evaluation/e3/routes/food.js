const { Router } = require("express");
const { FoodModel } = require("../db/model");

const food = Router();

/* method ==> POST */
food.post("/", (req, res) => {
	const food_item = new FoodModel(req.body);
	food_item.save((err, data) => {
		if (err) {
			res.status(400).send({ err: err.message });
		} else {
			res.send(data);
		}
	});
});

/* method ==> GET */
food.get("/", (req, res) => {
	if (req.query.min && req.query.max) {
		FoodModel.find({
			$and: [
				{ rating: { $gte: req.query.min } },
				{ rating: { $lte: req.query.max } },
			],
		}).exec((err, data) => {
			if (err) {
				res.send(404).send(err.message);
			} else {
				res.send(data);
			}
		});
	}
	if (req.query.price) {
		FoodModel.find({ price: { $lte: req.query.price } }).exec((err, data) => {
			if (err) {
				res.send(404).send(err.message);
			} else {
				res.send(data);
			}
		});
	} else {
		FoodModel.find(req.query).exec((err, data) => {
			if (err) {
				res.send(404).send(err.message);
			} else {
				res.send(data);
			}
		});
	}
});

/* method ==> PATCH */
food.patch("/:id", (req, res) => {
	const _id = req.params.id;
	FoodModel.findOneAndUpdate({ _id }, req.body, {
		returnOriginal: false,
	}).exec((err, data) => {
		if (err) {
			res.status(304).send({ err: "Unable to update/find" });
		} else {
			res.status(200).send(data);
		}
	});
});

/* method ==> PUT */
food.put("/:id", (req, res) => {
	const _id = req.params.id;
	FoodModel.findOneAndUpdate({ _id }, req.body, {
		returnOriginal: false,
	}).exec((err, data) => {
		if (err) {
			res.status(304).send({ err: "Unable to update/find" });
		} else {
			res.status(200).send(data);
		}
	});
});

/* method ==> DELETE */
food.delete("/:id", (req, res) => {
	const _id = req.params.id;
	FoodModel.findByIdAndDelete({ _id }, req.body).exec((err, data) => {
		if (err) {
			res.status(304).send({ err: "Unable to update/find" });
		} else {
			res.status(200).send(data);
		}
	});
});

module.exports = food;
