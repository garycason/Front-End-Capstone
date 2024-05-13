import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getDrink, updateDrink } from "../../services/drinkService"
import "./EditDrinkForm.css"

const EditDrinkForm = () => {
  //extract the drinkId from the URL parameters
  const { drinkId } = useParams()
  //Hook to programmatically navigate users after form submission
  const navigate = useNavigate()
  //State to store and update the current drink data
  const [drinkData, setDrinkData] = useState({
    drinkName: "",
    drinkDescription: "",
    imageURL: "",
    ingredients: {
      spirits: [],
      liqueurs: [],
      mixers: [],
      garnishes: [],
    },
  });
  //fetch the drink data from the server when the component mounts
  useEffect(() => {
    getDrink(drinkId).then((data) => setDrinkData(data))
  }, [drinkId])
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDrinkData((prev) => ({ ...prev, [name]: value }))
  };
  //handle changes to checkbox input for ingredients, updating state
  const handleIngredientChange = (category, value, checked) => {
    setDrinkData((prev) => ({
      ...prev,
      ingredients: {
        ...prev.ingredients,
        [category]: checked
          ? [...prev.ingredients[category], value]
          : prev.ingredients[category].filter((item) => item !== value),
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await updateDrink(drinkId, drinkData);
      navigate("/drinks") // Navigate back to the drinks list after successful update
    } catch (error) {
      console.error("Failed to update drink:", error)
    }
  };

  // Apply classes for styling
  return (
    <div className="edit-drink-form-container">
      {" "}
      {/* Wrapper class for CSS styling */}
      <form onSubmit={handleSubmit} className="edit-drink-form">
        {" "}
        {/* Form class for CSS styling */}
        <label className="edit-drink-label">
          Drink Name:
          <input
            type="text"
            name="drinkName"
            value={drinkData.drinkName}
            onChange={handleChange}
            required
            className="edit-drink-input"
          />
        </label>
        <label className="edit-drink-label">
          Drink Description:
          <textarea
            name="drinkDescription"
            value={drinkData.drinkDescription}
            onChange={handleChange}
            required
            className="edit-drink-textarea"
          />
        </label>
        <label className="edit-drink-label">
          Image URL:
          <input
            type="text"
            name="imageURL"
            value={drinkData.imageURL}
            onChange={handleChange}
            className="edit-drink-input"
          />
        </label>
        <div className="ingredient-section">
          <h3>Spirits</h3>
          {[
            "Vodka",
            "Lemon Vodka",
            "Lime Vodka",
            "Grapefruit Vodka",
            "Orange Vodka",
            "Watermelon Vodka",
            "Vanilla Vodka",
            "Gin",
            "Rum",
            "Tequila",
            "Bourbon",
            "Irish Whiskey",
            "Scotch",
            "Canadian Whiskey",
            "Tennessee Whiskey",
          ].map((spirit) => (
            <label key={spirit}>
              <input
                type="checkbox"
                checked={drinkData.ingredients.spirits.includes(spirit)}
                onChange={(e) =>
                  handleIngredientChange("spirits", spirit, e.target.checked)
                }
              />{" "}
              {spirit}
            </label>
          ))}
        </div>
        <div className="ingredient-section">
            <h3>Liqueurs</h3>
            {["Baileys Irish Cream", "Cointreau", "Grand Marnier", "Disarono", "Sambuca", "Chambord", "Frangelico", "St-Germain", "Chartreuse", "Bénédictine", "Drambuie", "Tia Maria", "Limoncello", "Midori", "Galliano", "Jägermeister", "Southern Comfort", "Sloe Gin"].map((liqueur) => (
          <label key={liqueur}>
            <input
              type="checkbox"
              checked={drinkData.ingredients.liqueurs.includes(liqueur)}
              onChange={(e) => handleIngredientChange("liqueurs", liqueur, e.target.checked)}
            /> {liqueur}
          </label>
        ))}
        </div>
        <div className="ingredient-section">
          <h3>Mixers</h3>
          {["Club Soda", "Tonic Water", "Coke", "Ginger Ale", "Sprite", "Orange Juice", "Cranberry Juice", "Pineapple Juice", "Tomato Juice", "Grapefruit Juice", "Lime Juice", "Lemon Juice", "Simple Syrup", "Grenadine", "Bitters", "Sour Mix", "Red Bull", "Cream", "Tea", "Coffee"].map((mixer) => (
          <label key={mixer}>
            <input
              type="checkbox"
              checked={drinkData.ingredients.mixers.includes(mixer)}
              onChange={(e) => handleIngredientChange("mixers", mixer, e.target.checked)}
            /> {mixer}
          </label>
        ))}
        </div>
        <div>
        <h3>Garnishes</h3>
        {["Mint", "Lemon Twist", "Olive", "Cherry", "Orange Slice", "Cocktail Onion", "Cucumber Slice", "Celery", "Sugar Rim", "Salt Rim"].map((garnish) => (
          <label key={garnish}>
            <input
              type="checkbox"
              checked={drinkData.ingredients.garnishes.includes(garnish)}
              onChange={(e) => handleIngredientChange("garnishes", garnish, e.target.checked)}
            /> {garnish}
          </label>
        ))}
        </div>
        <button type="submit" className="edit-drink-submit">
          Update Drink
        </button>
      </form>
    </div>
  );
};

export default EditDrinkForm;
