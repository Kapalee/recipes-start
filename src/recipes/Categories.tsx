import { useState, useEffect } from "react";
import { getCategories } from "../services/apiFacade";
import { NavLink } from "react-router-dom";

export const Categories = () => {
  const [categories, setCategories] = useState<Array<string>>();
  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);
  return (
    <>
      <h2>Categories</h2>
      <p>Browse recipes by category.</p>

      <ul>
        {categories?.map((category) => (
          <li key={category}>
            {category}
             {<NavLink to={`/recipes?category=${category}`}>{category}</NavLink>} 
          </li>
        ))}
      </ul>
    </>
  );
};

export const Desktops = () => <h3>Desktop PC Page</h3>;
export const Laptops = () => <h3>Laptops Page</h3>;
