const { model } = require("mongoose");
const { foodSchema } = require("./schema");

const FoodModel = model("food_item", foodSchema);

module.exports = { FoodModel };
