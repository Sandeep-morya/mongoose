const { Schema } = require("mongoose");

const foodSchema = Schema({
	dish_name: { type: String, required: true },
	price: { type: Number, required: true },
	cuisine: { type: String, required: true },
	rating: { type: Number, required: true },
}); //{versionKey:true} is by Default

module.exports = {foodSchema}