
import { menuArray } from "./data"

function getItemsHTML() {
  // need to map through data to add it to HTML template 
  const foodItemsArr = menuArray.map((item) => {

    const {name, ingredients, id, price, emoji} = item

    return `
        <div class="food-item-card">
          <p class="item-emoji">${emoji}</p>
          <div class="item-details">
            <h4 class="item-name">${name}</h4>
            <p class="item-ingredients">${ingredients.join(", ")}</p>
            <p class="item-price">$${price}</p>
          </div>
          <div class="btn-wrapper">
            <button class="add-btn" data-add=${id}>+</button>
          </div>
        </div> 
        
    `
  }).join("")

  return foodItemsArr
}

function renderTotalOrderSection() {
  return  `
    <h3 class="order-title">Your order</h3>
    <div id ="order-container" class="order-container">
      <!-- order items render here -->
    </div>
    <div id="total-price-container" class="total-price-container">
      <p>Total Price:</p>
      <div class="price-wrapper">
        <p id="total-price">$0</p>
      </div>
    </div>
  `
}
function render() {
    document.getElementById('menu-items-container').innerHTML = getItemsHTML()
    document.getElementById('order-items-container').innerHTML = renderTotalOrderSection()
  }


  export {getItemsHTML, renderTotalOrderSection, render} 