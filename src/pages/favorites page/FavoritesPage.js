import React, { useState, useEffect } from 'react';
import './FavoritesPage.css';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavoriteRecipes(favorites);
    }, []);

    const removeFromFavorites = (id) => {
        const updatedFavorites = favoriteRecipes.filter(recipe => recipe.idMeal !== id);
        setFavoriteRecipes(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className='favorites_page'>
            <h2>Favorite Recipes</h2>

            {favoriteRecipes.length === 0 ? (
                <p>No favorite recipes added yet. <Link to="/" className='link'>Back to home</Link></p>
            ) : (
                <div className='favorite_recipe_list'>
                    {favoriteRecipes.map(recipe => (
                        <div key={recipe.idMeal} className='recipe'>
                            <Link to={`/recipe/${recipe.idMeal}`} className="recipe_link">
                                <h3>{recipe.strMeal}</h3>
                                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                                <button className='button' onClick={() => removeFromFavorites(recipe.idMeal)}>Remove</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FavoritesPage;
