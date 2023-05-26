
import React, { useEffect, useState } from "react";
import axios from "axios";
import useGetUserId from "../hooks/useGetUserId.jsx";

const SaveRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  
  const userID = useGetUserId();

  useEffect(() => {
    const fetchSaveRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/savedRecipes/${userID}`);
        console.log(response.data.savedRecipes);
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSaveRecipe();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes && savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>

            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} | (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SaveRecipe
