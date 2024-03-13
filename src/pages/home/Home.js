import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { motion } from 'framer-motion';

const Home = () => {
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    const API_URL = 'https://www.themealdb.com/api/json/v1/1';

    const fetchRandomImages = async () => {
      try {
        const response = await axios.get(`${API_URL}/random.php`);
        const images = response.data.meals;
        setBackgroundImages(images);
      }
      catch (error) {
        console.error('Error fetching random images:', error);
      }
    };

    fetchRandomImages();

    const interval = setInterval(() => {
      fetchRandomImages();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className='home' id='home'>
      <div className='background_image_slide'>
        {backgroundImages.length > 0 && backgroundImages.map((image, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            key={index}
            className='background_image'
            style={{ backgroundImage: `url(${image.strMealThumb})` }}>
          </motion.div>
        ))}
      </div>
      <div className='home_content'>
        <h1>Delicious Recipes!!!</h1>
        <h3>Search. Cook. Enjoy.</h3>
      </div>
    </div>
  )
}

export default Home;
