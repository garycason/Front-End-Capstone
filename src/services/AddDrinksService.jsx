//AddDrinksService.jsx

const API_URL = 'http://localhost:8088/drinks'; // Adjust with your actual API endpoint

// Function to add a new drink
export const addDrink = async (drinkData) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(drinkData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Could not create drink');
    }
    return data;
  } catch (error) {
    console.error('Error creating new drink:', error);
    throw error; // Re-throw the error for handling in the component
  }
};
