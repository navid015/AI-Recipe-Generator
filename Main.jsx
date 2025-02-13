import React, { useState } from "react";
import IngredientsList from "./components/IngredientsList";
import AIRecipe from "./components/AIRecipe";
import { getRecipeFromAnthropicAI, getRecipeFromMistralAI } from "./ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");
    const [newIngredient, setNewIngredient] = React.useState(""); 

    function addIngredient() {
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        setNewIngredient(""); 
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromAnthropicAI(ingredients);
        setRecipe(recipeMarkdown);
    }

    function handleSubmit(e){
            e.preventDefault();  
            addIngredient();  
        }
    

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    value={newIngredient} 
                    onChange={(e) => setNewIngredient(e.target.value)}
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            )}

            {recipe && <AIRecipe recipe={recipe} />}
        </main>
    );
}
