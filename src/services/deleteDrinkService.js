//deleteDrinkService.js
const API_BASE_URL = 'http://localhost:8088';

export const deleteDrink = async (drinkId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/drinks/${drinkId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Could not delete the drink.');
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting drink:', error);
    throw error;
  }
};
