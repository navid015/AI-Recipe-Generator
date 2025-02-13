import React, { useState } from "react";
import IngredientsList from "./components/IngredientsList";
import AIRecipe from "./components/AIRecipe";
import { getRecipeFromAnthropicAI, getRecipeFromMistralAI } from "./ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        []
    );
    const [recipe, setRecipe] = useState("");
    const [newIngredient, setNewIngredient] = React.useState(""); // State to control input field

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromAnthropicAI(ingredients);
        setRecipe(recipeMarkdown);
    }

    function addIngredient() {
        setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        setNewIngredient(""); 
    }

    function handleSubmit(e) {
        e.preventDefault(); 
        addIngredient(); 
    }

    function handleSubmit(e){
            e.preventDefault();  // Prevent form reload
            const formData = new FormData(e.target);
            addIngredient(formData);  // Add ingredient
        }
    

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    value={newIngredient} // Bind input value to state
                    onChange={(e) => setNewIngredient(e.target.value)} // Update state on change
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
