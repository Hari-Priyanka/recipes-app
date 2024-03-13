import React, {useState} from 'react';
import './Sidebar.css';
import { AnimatePresence, motion } from 'framer-motion';
import Area from '../list/Area';
import Category from '../list/Category';
import Ingredients from '../list/Ingredients';
import {Link} from 'react-router-dom';

const SideBar = ({closeSidebar}) => {
    const [showCuisine, setShowCuisine] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);

    const toggleCuisineList = () => {
        setShowCuisine(!showCuisine);
    };

    const toggleCategoryList = () => {
        setShowCategory(!showCategory);
    };

    const toggleIngredientList = () => {
        setShowIngredients(!showIngredients);
    };

  return (
    <AnimatePresence>
        <motion.nav 
        initial={{x:-100}}
        animate={{x:0}}>
        <ul>
            <li>
                <h2 className='sidebar_title'>All Categories</h2>
            </li>
            <li>
                <span onClick={toggleCuisineList} className='title'>Cuisine</span>
                {showCuisine && <Area closeSidebar={closeSidebar}/>}
            </li>
            <li>
                <span onClick={toggleCategoryList} className='title'>Category</span>
                {showCategory && <Category closeSidebar={closeSidebar}/>}
            </li>
            <li>
                <span onClick={toggleIngredientList} className='title'>Ingredients</span>
                {showIngredients && <Ingredients closeSidebar={closeSidebar}/>}
            </li>
            <li>
            <Link to="/favorites">
                <span className='title'>Favorite Recipes</span>
            </Link>
            </li>
        </ul>
        </motion.nav>
    </AnimatePresence>
  )
};

export default SideBar;
