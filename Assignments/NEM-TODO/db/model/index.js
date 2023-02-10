const { model } = require("mongoose");
const { todoSchema } = require("./schema");

module.exports = {
	TodoModel: model("todo", todoSchema),
};
