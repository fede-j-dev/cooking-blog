const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    recipe: { type: String, required: true },
    ingredients: { type: String, required: true },
    recipeImage: { type: String, required: true },
    cooktime: { type: String, required: true },
    food: { type: String, required: true },
  },
  { timestamps: true }
);

const Recipes = mongoose.model("Recipes", recipeSchema);

module.exports = Recipes;
