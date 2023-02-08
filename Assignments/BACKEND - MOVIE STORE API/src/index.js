const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
mongoose.set("strictQuery", false);
const main = async () => {
	app.use(cors());
	app.use(express.static("src/public"));
	app.use(express.json());

	await mongoose.connect("mongodb://127.0.0.1:27017/moviesDB");
	// const gen = () => (Math.random() * 10).toFixed(1);
	// MovieModel.find().then((data) => {
	// 	data.forEach((e) => {
	// 		MovieModel.updateOne({ _id: e._id }, { $set: { rating: gen() } }).then();
	// 	});
	// }); //👆👆 i have used this to generate Random ratings

	app.get("/movies", (req, res) => {
		const title = req.query?.q;
		const rating = req.query?.rating;
		const sort = req.query?.sort;
		const order = req.query?.order == "dsc" ? -1 : 1;
		const page =
			typeof +req.query?.page == "number" ? Number(req.query.page) : 1;
		const limit =
			typeof +req.query?.limit == "number" ? Number(req.query.limit) : 2;

		if (title && !rating && !sort) {
			MovieModel.find({ title: { $regex: title, $options: "i" } })
				.skip((page - 1) * limit)
				.limit(limit)
				.exec((err, docs) => {
					if (err) {
						res.status(404).send();
					} else {
						res.status(200).send({ data: docs, totalCount: docs.length });
					}
				});
		}
		if (rating && !title && !sort) {
			MovieModel.find({
				$and: [
					{ rating: { $gte: Number(rating) } },
					{ rating: { $lt: Number(rating) + 1 } },
				],
			})
				.skip((page - 1) * limit)
				.limit(limit)
				.exec((err, docs) => {
					if (err) {
						res.status(404).send();
					} else {
						res.status(200).send({ data: docs, totalCount: docs.length });
					}
				});
		}
		//localhost:8080/movies?q=as&sort=(title|rating)
		if (title && sort) {
			MovieModel.find({ title: { $regex: title, $options: "i" } })
				.skip((page - 1) * limit)
				.limit(limit)
				.sort({ [sort]: order })
				.exec((err, docs) => {
					if (err) {
						res.status(404).send();
					} else {
						res.status(200).send({ data: docs, totalCount: docs.length });
					}
				});
		}
	});

	app.post("/movies", (req, res) => {
		const movie = new MovieModel(req.body);
		movie.save((err, user) => {
			if (err) {
				res.status(403).send(err.message);
			} else {
				res.send(user);
			}
		});
	});

	app.patch("/movies/:id", (req, res) => {
		const _id = req.params.id;
		MovieModel.updateOne({ _id }, { $set: req.body }).exec((err) => {
			if (err) {
				res.status(304).send();
			} else {
				MovieModel.find({ _id }).exec((_, docs) => {
					res.status(201).send(docs);
				});
			}
		});
	});

	app.delete("/movies/:id", (req, res) => {
		const _id = req.params.id;
		MovieModel.find({ _id }).exec((err, docs) => {
			if (err) {
				res.status(404).send("Not Found");
			} else {
				MovieModel.deleteOne({ _id }).exec(() => {
					if (docs.length) {
						res.status(202).send(docs);
					} else {
						res.status(404).send("Not Found");
					}
				});
			}
		});
	});

	app.listen(8080, () => console.log("Server is running"));
};

main();

const movieSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please give Title"],
		},
		year: {
			type: Number,
			required: [true, "Please Mention the realse Year"],
		},
		runtime: {
			type: Number,
			required: [true, "Please Give the runtime length in minutes"],
		},
		genres: {
			type: [],
			required: [true, "Please give the genres as array of strings"],
		},
		director: {
			type: String,
			required: [true, "You have not given the name of the director"],
		},
		actors: {
			type: String,
			required: [true, "Please give Name of Cast"],
		},
		plot: {
			type: String,
			required: [true, "Please give description of plot of movie"],
		},
		posterUrl: {
			type: String,
			required: [true, "Please give Poster Url"],
		},
		rating: {
			type: Number,
			required: [true, "Please give Rating Count"],
		},
	},
	{ versionKey: false },
);

const MovieModel = mongoose.model("movie", movieSchema);
