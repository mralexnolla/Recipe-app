import express from "express"
import mongoose from "mongoose"
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";


const router = express.Router()

/** get all reciepies */
router.get("/", async (req,res) => {
    try {
        const response = await RecipeModel.find({})
        res.json(response)
    } catch (error) {
        res.json(error)
    }
    
})

/** create recipes */
router.post("/", verifyToken, async (req, res) => {
    //const { name, ingredients, instructions, imageUrl, userOwner } = req.body;
    const recipe = new RecipeModel(req.body)
  try {
    const response = await recipe.save();
    res.json({ message: "Recipe added successfully", response, data: recipe });
  } catch (error) {
    res.json(error);
  }
  
});

/** save recipe */
router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);

    user.savedRecipes.push(recipe);
    await user.save();

    res.json({
      message: "recipe updated successfully",
      savedRecipes: user.savedRecipes,
    });
  } catch (error) {
    res.json(error);
  }
});

/** Get saved recipes by a specific userID */
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes: user?.savedRecipes})
    } catch (error) {
       res.json(error) 
    }
})

/** Get saved recipes */
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      //get saved recipes where
      _id: { $in: user.savedRecipes }, // id in this users saved recipes ie saved recipes by user
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

export {router as recipesRouter}