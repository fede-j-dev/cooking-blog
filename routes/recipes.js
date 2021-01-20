const express = require("express");
const router = express.Router();
const multer = require("multer");
const Recipes = require("../models/recipes");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// REQUEST GET ALL RECIPES
router.get("/", (req, res) => {
  Recipes.find()
    .then((recipe) => res.json(recipe))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//REQUEST ADD NEW RECIPE
router.post("/add", upload.single("recipeImage"), (req, res) => {
  const newRecipe = new Recipes({
    title: req.body.title,
    recipe: req.body.recipe,
    ingredients: req.body.ingredients,
    cooktime: req.body.cooktime,
    food: req.body.food,
    recipeImage: req.file.originalname,
  });

  newRecipe
    .save()
    .then(() => res.json("The new recipe was posted succesfully"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//REQUEST FIND RECIPE BY ID
router.get("/:id", (req, res) => {
  Recipes.findById(req.params.id)
    .then((recipe) => res.json(recipe))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//REQUEST FIND RECIPE BY ID AND UPDATE

router.put("/update/:id", upload.single("recipeImage"), (req, res) => {
  Recipes.findById(req.params.id)
    .then((recipe) => {
      recipe.title = req.body.title;
      recipe.recipe = req.body.recipe;
      recipe.ingredients = req.body.ingredients;
      recipe.cooktime = req.body.cooktime;
      recipe.food = req.body.food;
      recipe.recipeImage = req.file.originalname;
      recipe
        .save()
        .then(() => res.json("the recipe was updated succesfully"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// REQUEST FIND RECIPE BY ID AND DELETE
router.delete("/:id", (req, res) => {
  Recipes.findByIdAndDelete(req.params.id)
    .then(() => res.json("The recipe was deleted"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
