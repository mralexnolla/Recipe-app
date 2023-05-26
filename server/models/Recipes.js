import { mongoose, Schema } from "mongoose";

const RecipeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  ingredients: [{ type: String, required: true, trim: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: {type: Number, required: true},
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
