
import { menuArray } from "./data";


function getItemsHTML() {
  // need to map through data to add it to HTML template 

  const foodItemsArr = menuArray.map((item) => {

    const {name, ingredients, price, emoji} = item

    return `
        <div class="food-item-card">
          <p class="item-emoji">${emoji}</p>
          <div class="item-details">
            <h4 class="item-name">${name}</h4>
            <p class="item-ingredients">${ingredients.join(", ")}</p>
            <p class="item-price">$${price}</p>
          </div>
          <div class="btn-wrapper">
            <button class="add-btn">+</button>
          </div>
        </div> 
    `
  }).join("")
  return foodItemsArr
}
function render() {
  document.getElementById('menu-items-container').innerHTML = getItemsHTML()
}

render()

/*
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"

*/ 