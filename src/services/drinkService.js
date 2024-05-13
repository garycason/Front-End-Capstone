// src/services/drinkService.js
export const getDrink = async (drinkId) => {
    const response = await fetch(`http://localhost:8088/drinks/${drinkId}`);
    if (!response.ok) throw new Error('Failed to fetch drink');
    return await response.json();
  };
  
  export const updateDrink = async (drinkId, drinkData) => {
    const response = await fetch(`http://localhost:8088/drinks/${drinkId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(drinkData)
    });
    if (!response.ok) throw new Error('Could not update the drink');
    return await response.json();
  };
  