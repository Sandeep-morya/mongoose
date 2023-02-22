const { Router } = require("express");
const { UserModel } = require("../Config/model/user.model");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { KEY } = process.env;

const userRoute = Router();

/* All Note Routes  👇👇👇👇👇*/


/* Registration Route */
userRoute.post("/register", async (req, res) => {
	try {
		const hashed = await bcrypt.hash(`${req.body.password}`, 5);

		const user = new UserModel({ ...req.body, password: hashed });
		const data = await user.save();
		res.status(201).send({ message: "Registerd Successfully", data });
	} catch ({ message }) {
		res.status(403).send(message);
	}
});

/* Login Route */
userRoute.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) throw new Error();

		const user = await UserModel.findOne({ email });

		const auth = await bcrypt.compare(`${password}`, user.password);
		if (!auth) throw new Error();

		const token = jwt.sign({ user }, KEY);
		res.send({message:"Login Successfull",token});
	} catch (error) {
		res.status(401).send();
	}
});


/* Show the User */
userRoute.get("/", (req, res) => {
	const token = req.headers.authorization;
	try {

		if(!token) throw new Error();
		const data = jwt.verify(token,KEY);
		res.send({message:"User verification success", data})

	} catch (error) {
		res.status(401).send();
	}
});

module.exports = { userRoute };
