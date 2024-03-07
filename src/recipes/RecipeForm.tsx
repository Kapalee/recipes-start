import "./RecipeForm.css";
import { useState } from "react";
import { getCategories, addRecipe, deleteRecipe, Recipe } from "../services/apiFacade";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const EMPTY_RECIPE = {
  id: null,
  name: "",
  category: "",
  instructions: "",
  thumb: "",
  youTube: "",
  ingredients: "",
  source: "",
};

export default function RecipeForm() {
  const [categories, setCategories] = useState([""]);
  //const recipeToEdit = useLocation().state || null;
  const recipeToEdit = null;
  //const [formData, setFormData] = useState<Recipe>(recipeToEdit || EMPTY_RECIPE);
  const [formData, setFormData] = useState<Recipe>(recipeToEdit || EMPTY_RECIPE);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
   }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
     setFormData((prevFormData) => ({
       ...prevFormData,
       [name]: value,
     }));
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault();
     if (formData.id) {
       deleteRecipe(Number(formData.id));
      setFormData({ ...EMPTY_RECIPE });
     }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
e.preventDefault();
const addedOrEdited = formData.id ? "edited" : "added";
const newRecipe = await addRecipe(formData);
alert(`Recipe ${addedOrEdited} successfully!`);
setFormData({ ...EMPTY_RECIPE });
console.log("newRecipe", newRecipe);

  };

  return (
    <>
      <h2>Recipes Add/Edit/Delete</h2>
      <form id="recipeForm">
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" id="name" name="name" disabled value={formData.id || ""} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            // @ts-ignore
            onChange={handleChange}
            required
          >
            {/* Default option */}
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            rows={4}
            value={formData.instructions}
            // @ts-ignore
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="thumb">Thumbnail URL:</label>
          <input
            type="text"
            id="thumb"
            name="thumb"
            value={formData.thumb}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="youTube">YouTube URL:</label>
          <input
            type="text"
            id="youTube"
            name="youTube"
            value={formData.youTube}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows={3}
            value={formData.ingredients}
            // @ts-ignore
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <input type="text" id="source" name="source" required />
        </div>
      </form>
      <button onClick={handleSubmit} className="recipe-form-btn">
        Submit
      </button>
      <button
        className="recipe-form-btn"
        onClick={() => {
          setFormData({ ...EMPTY_RECIPE });
        }}
      >
        Cancel
      </button>
      {formData.id && (
        <>
          <button className="recipe-form-btn" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}

      <p>{JSON.stringify(formData)}</p>
    </>
  );
}
