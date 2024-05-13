//AllDrinksService.jsx
export const getAllDrinks = () => {
    return fetch(`http://localhost:8088/drinks`).then((res) => res.json())
}