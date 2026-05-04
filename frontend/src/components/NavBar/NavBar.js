import React, { useState } from 'react';
import './NavBar.css';

const NavBar = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Music',
    'Trailers',
    'News',
    'Anirudh Ravichander',
    'Gaming',
    'Web Development',
    'Computer programming',
    'Tamil Cinema',
    'T-Series',
    'Live',
    'Recently uploaded',
    'Watched',
    'New to you'
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-scroll">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`navbar-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
