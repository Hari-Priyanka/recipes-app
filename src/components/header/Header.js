import React, { useState, useEffect } from 'react';
import './Header.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBars,FaTimes } from 'react-icons/fa';
import axios from 'axios';
 
const Header = ({ toggleSidebar,showSidebar }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
        const API_URL = 'https://www.themealdb.com/api/json/v1/1';

        const fetchRecipes = async () => {
            if (searchQuery.length >= 3) {
                try {
                    const response = await axios.get(`${API_URL}/search.php?s=${searchQuery}`);
                    setSearchResults(response.data.meals);
                }
                catch (error) {
                    console.log("Error fetching recipes", error);
                }
            }
            else {
                setSearchResults([]);
            }
        };
        fetchRecipes();
    }, [searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearSearchResults = () => {
        setSearchResults([]);
        setSearchQuery('');
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
            <motion.div>
                <Link to="/" className='logo'>
                    <GiKnifeFork /><span>Delicious</span>
                </Link>
            </motion.div>
            <motion.div className='icons'>
                <div className='search_bar '>
                    <input type='text'
                        placeholder='Search for recipes'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <AiOutlineSearch className='search_icon' />
                    {searchResults.length > 0 && (
                        <ul className='search_results'>
                            {searchResults.map(recipe => {
                                return (
                                    <li key={recipe.map}>
                                        <Link to={`/recipe/${recipe.idMeal}`}
                                            className='link'
                                            onClick={clearSearchResults}>
                                            {recipe.strMeal}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
                {showSidebar ? (
                    <FaTimes className='menu_icon' onClick={toggleSidebar} />
                ) : (
                    <FaBars className='menu_icon' onClick={toggleSidebar} />
                )}
            </motion.div>
        </motion.header>
    )
}

export default Header;
