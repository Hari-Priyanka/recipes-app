import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './List.css';

const Ingredients = ({closeSidebar}) => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const API_URL = 'https://www.themealdb.com/api/json/v1/1';

        const fetchIngredients = async () => {
            try{
                const response = await axios.get(`${API_URL}/list.php?i=list`);
                const ingredientList = response.data.meals.map(ingredient => ingredient.strIngredient);
                const sortedIngredients = ingredientList.sort((a,b) => a.localeCompare(b));
                setIngredients(sortedIngredients);
            }
            catch(error){
                console.error("Error fetching ingredient list",error);
            }
        };
        fetchIngredients();
    }, [ingredients]);

    const handleClick = () => {
      closeSidebar();
    };

  return (
    <div className='list_item'>
      {ingredients.map(ingredient => (
        <Link 
        key={ingredient} 
        to={`/ingredients/${ingredient.toLowerCase()}`} 
        className='ingredients active_link' 
        onClick={handleClick}
        >
            {ingredient}
        </Link>
      ))}
    </div>
  )
}

export default Ingredients;
