import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './List.css';

const Category = ({closeSidebar}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const API_URL = 'https://www.themealdb.com/api/json/v1/1';
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories.php`);
        const categoryList = response.data.categories.map(category => category.strCategory);
        setCategories(categoryList);
      }
      catch (error) {
        console.error("error fetching category list",error);
      }
    };
    fetchCategories();
  }, [categories]);

  const handleClick = () => {
    closeSidebar();
  };

  return (
    <div className='list_item'>
      {categories.map(category => (
        <Link 
        key={category} 
        to={`/categories/${category.toLowerCase()}`} 
        className='categories active_link' 
        onClick={handleClick}
        >
          {category}
        </Link>
      ))}
    </div>
  )
};

export default Category;
