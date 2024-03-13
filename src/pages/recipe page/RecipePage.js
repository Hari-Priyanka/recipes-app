import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './RecipePage.css';
import Home from '../home/Home';

const RecipePage = () => {
    const [recipes, setRecipes] = useState([]);
    const { area, category, ingredient } = useParams();

    useEffect(() => {
        const API_URL = 'https://www.themealdb.com/api/json/v1/1';

        const fetchRecipes = async () => {
            try {
                let response;
                if (area) {
                    response = await axios.get(`${API_URL}/filter.php?a=${area}`);
                }
                else if (category) {
                    response = await axios.get(`${API_URL}/filter.php?c=${category}`);
                }
                else if (ingredient) {
                    response = await axios.get(`${API_URL}/filter.php?i=${ingredient}`);
                }
                if (response) {
                    setRecipes(response.data.meals);
                }
            }
            catch (error) {
                console.error('Error fetching recipes', error)
            }
        };

        fetchRecipes();
    }, [area, category, ingredient]);

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className='recipes'>
            <button className='btn' onClick={handleBack}>Back</button>
            <div className='home_data'>
                <Home />
            </div>
            <div className='recipe_page'>
                <h2>Recipes {area ? `for ${area}` : category ? `for ${category}` : ''}</h2>
                <div className='recipe_list'>
                    {recipes && recipes.map(recipe => (
                        <div key={recipe.idMeal} className='recipe'>
                            <Link to={`/recipe/${recipe.idMeal}`} className='recipe_link'>
                                <h3>{recipe.strMeal}</h3>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default RecipePage;
