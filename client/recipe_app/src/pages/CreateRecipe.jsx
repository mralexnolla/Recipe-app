import React from "react";
import { useState } from "react";
import axios from "axios"
import useGetUserId from "../hooks/useGetUserId";
import {useNavigate} from 'react-router-dom'
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  
  const userID = useGetUserId();
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const [message, setMessage] = useState("")

  const [cookies, _] = useCookies(["access_token"]);

  const handleChange = (e) => {
    e.preventDefault();
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  /** handle ingredient and add ingredient */
  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    //const UpdateIngredients = recipe.ingredients;
    const UpdateIngredients = [...recipe.ingredients]
    UpdateIngredients[index] = value;
    //setRecipe({ ...recipe, UpdateIngredients });
    setRecipe({ ...recipe, ingredients:UpdateIngredients });
  };

  const addIngredients = (e) => {
    e.preventDefault();
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  
  /** handleSubmit */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/recipes", recipe, {headers: {authorization: cookies.access_token}}); 
      if(response.data.message){
        setMessage(response.data.message);
      } 
      navigate("/"); 
    } catch (error) {
      console.log(error)
    } 
  }


  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>

        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
          />
        ))}

        <button onClick={addIngredients}>Add Ingredients</button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          id="instructions"
          cols="40"
          rows="5"
          onChange={handleChange}
          style={{whiteSpace: "pre-wrap"}}
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          onChange={handleChange}
        />

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          name="cookingTime"
          id="cookingTime"
          onChange={handleChange}
        />
        <input type="submit" value="Create Recipe" />
        <h3>{message}</h3>
      </form>
    </div>
  );
};

export default CreateRecipe;



