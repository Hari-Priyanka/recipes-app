import React, { useState, useEffect } from 'react';
import './RecipeDetails.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaAngleRight } from 'react-icons/fa';

const RecipeDetails = () => {
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const API_URL = 'https://www.themealdb.com/api/json/v1/1';
        const fetchRecipeDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
                setRecipeDetails(response.data.meals[0]);
            } catch (error) {
                console.error("Error fetching recipe details", error);
            }
        };
        fetchRecipeDetails();
    }, [id]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyAdded = favorites.some(favorite => favorite.idMeal === recipeDetails?.idMeal);
        setIsFavorite(isAlreadyAdded);
    }, [recipeDetails]);

    const addToFavorites = () => {
        if (!isFavorite) {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            favorites.push(recipeDetails);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(true);
        }
    };

    if (!recipeDetails) {
        return <div>Loading...</div>;
    }

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className='recipe_details'>
        <button className='btn' onClick={handleBack}>Back</button>
            <h2>{recipeDetails.strMeal}</h2>
            <button className='button' onClick={addToFavorites}>
                {isFavorite ? 'Added to Favorites' : 'Add to Favorites'}
            </button>
            <div className='details'>
                <div className='container'>
                    <div className='image'>
                        <img src={recipeDetails.strMealThumb} alt={recipeDetails.strMeal} />
                    </div>
                    <div>
                        <a href={recipeDetails.strYoutube} className='button'>Watch Youtube</a>
                        <a href={recipeDetails.strSource} className='button'>Recipe Source</a>
                    </div>
                </div>
                <div className='recipe_ingredients'>
                    <h3>Ingredients</h3>
                    <div className='ingredient_list_item'>
                        {Array.from({ length: 20 }).map((_, index) => {
                            const ingredientKey = `strIngredient${index + 1}`;
                            const measureKey = `strMeasure${index + 1}`;
                            const ingredient = recipeDetails[ingredientKey];
                            const measure = recipeDetails[measureKey];

                            if (ingredient) {
                                return (
                                   
                                    <span key={ingredientKey} className='ingredient_list'><FaAngleRight /> {`${measure} ${ingredient}`}</span>
                                    
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
                <div className='recipe_steps'>
                    <h3>Instructions</h3>
                    <p>{recipeDetails.strInstructions}</p>
                </div>
            </div>
        </div>
    )
};

export default RecipeDetails;
