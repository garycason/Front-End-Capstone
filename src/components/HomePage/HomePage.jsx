import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { getAllDrinks } from '../../services/AllDrinksService';

const HomePage = () => {
  //State for storing featured drink of the day
  const [drinkOfTheDay, setDrinkOfTheDay] = useState(null);
  //Effect hook to fetch all drinks and select a random one as the featured drink
  useEffect(() => {
    const fetchDrinks = async () => {
      const drinks = await getAllDrinks();
      if (drinks.length > 0) {//Fetch all drinks from the server
        const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
        setDrinkOfTheDay(randomDrink);
      }
    };

    fetchDrinks();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to my Bar!</h1>
      <p>Discover and share your favorite cocktail recipes.</p>

      {/* Featured Drink Section */}
      {drinkOfTheDay && (
        <section className="featured-drink">
          <h2>Featured Drink: {drinkOfTheDay.drinkName}</h2>
          <img src={drinkOfTheDay.imageURL} alt={drinkOfTheDay.drinkName} />
          <p>{drinkOfTheDay.drinkDescription}</p>
        </section>
      )}

      
      {/* Navigation Links */}
      <nav className="home-nav">
        <Link to="/drinks">All Drinks</Link>
        <Link to="/add-drink">Add New Drink</Link>
      </nav>
    </div>
  );
};

export default HomePage;
