const fs = require("fs");

/*  Middleware Create Record */
const record = (req, res, next) => {
	if (
		(req.params.id && req.method === "PATCH") ||
		req.method === "PUT" ||
		req.method === "DELETE"
	) {
		const time = new Date();
		fs.appendFile(
			"records.txt",
			`The dish with id:${(req.url).slice(6)} has been ${(req.method).toLowerCase()}d | ${time}.\n`,
			(err) => {
				if (err ) {
					res.status(503).send({ err: "Unable to update/delete" });
				} else {
					next();
				}
			},
		);
	} else {
		next();
	}
};

module.exports = record;
