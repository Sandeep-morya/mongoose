/*  Middleware to manage is all fields are present */

const fieldsAnalyzer = (req, res, next) => {
	if (req.method === "POST") {
		const { dish_name, price, cuisine, rating } = req.body;
		if (!dish_name || !price || !cuisine || !rating) {
			res.status(403).send({
				err: "Few fields are missing, cannot process the request",
			});
		} else {
			next();
		}
	} else {
		next();
	}
};

module.exports = fieldsAnalyzer;
