// DrinkListPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'  // Added useLocation import
import { getAllDrinks } from '../../services/AllDrinksService'
import './DrinkListPage.css'
import { deleteDrink } from '../../services/deleteDrinkService.js'

const useQuery = () => new URLSearchParams(useLocation().search)

const DrinkListPage = () => {
  const [drinks, setDrinks] = useState([])//state to store the list of drinks
  const navigate = useNavigate()
  const currentUser = localStorage.getItem('userId')//gets the current user's id from local storage
  const query = useQuery()
  const searchTerm = query.get('search')

  useEffect(() => {
    const fetchDrinks = async () => {
      const fetchedDrinks = await getAllDrinks()
      if (searchTerm) {
        const filteredDrinks = fetchedDrinks.filter(drink =>
          drink.drinkName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          drink.ingredients.some(category => 
            category.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        );
        setDrinks(filteredDrinks)
      } else {
        setDrinks(fetchedDrinks)
      }
    };

    fetchDrinks()
  }, [searchTerm])  // Dependency on searchTerm to refetch when it changes

  const handleDelete = async (drinkId) => {
    if (window.confirm('Are you sure you want to delete this drink?')) {
      const updatedDrinks = drinks.filter(drink => drink.id !== drinkId);
      setDrinks(updatedDrinks)  // Optimistically update the state

      try {
        await deleteDrink(drinkId);
        console.log(`Drink with id ${drinkId} deleted.`)
      } catch (error) {
        console.error('Failed to delete drink:', error)
        // Notify the user of the failure
      }
    }
  };

  return (//renders the drinks and needed buttons.
    <div>
      <h1>All Drinks</h1>
      <div>
        {drinks.map((drink) => (
          <div key={drink.id}>
            <h2>{drink.drinkName}</h2>
            <p>{drink.drinkDescription}</p>
            <img src={drink.imageURL} alt={drink.drinkName} style={{ maxWidth: '150px' }} />
            <p>Ingredients:</p>
            <ul>
              {drink.ingredients.spirits?.map(spirit => <li key={`spirit-${spirit}`}>{spirit}</li>)}
              {drink.ingredients.liqueurs?.map(liqueur => <li key={`liqueur-${liqueur}`}>{liqueur}</li>)}
              {drink.ingredients.mixers?.map(mixer => <li key={`mixer-${mixer}`}>{mixer}</li>)}
              {drink.ingredients.garnishes?.map(garnish => <li key={`garnish-${garnish}`}>{garnish}</li>)}
            </ul>
            {currentUser === drink.userId && (
              <>
                <button className='edit-button' onClick={() => navigate(`/edit-drink/${drink.id}`)}>Edit Drink</button>
                <button className='delete-button' onClick={() => handleDelete(drink.id)}>Delete Drink</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrinkListPage;
