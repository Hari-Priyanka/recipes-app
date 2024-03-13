import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import RecipePage from './pages/recipe page/RecipePage';
import RecipeDetails from './pages/recipe details/RecipeDetails';
import FavoritesPage from './pages/favorites page/FavoritesPage';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <Router>
      <Header toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
      {showSidebar && <Sidebar closeSidebar={closeSidebar} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/areas/:area" element={<RecipePage />}/>
        <Route path="/categories/:category" element={<RecipePage/>}/>
        <Route path="/ingredients/:ingredients" element={<RecipePage/>}/>
        <Route path="/recipe/:id" element={<RecipeDetails/>}/>
        <Route path="/favorites" element={<FavoritesPage/>}/>      </Routes>
    </Router>
  );
}

export default App;
