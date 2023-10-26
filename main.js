
import { menuArray } from "./data";

const arrOfOrders = []

document.addEventListener('click', function(e) {
  if (e.target.dataset.add) {
    handleAddBtnClick(e.target.dataset.add)
    orderCalls()
  } else if (e.target.dataset.remove) {
    handleRemoveBtnClick(e.target.dataset.remove) 
    orderCalls()
  }
})

// function to call all the nescessary functions
function orderCalls() {
    updateOrderSection()
    getTotalOrder()
    addCheckOutElement()
}

function handleRemoveBtnClick(itemId) {
  // finding what index the item in question is at in the array of orders (so it knows what index to remove)
  const itemIndex = arrOfOrders.findIndex((item) => itemId === item.id.toString());

  // !== -1 means a value has been found
  if (itemIndex !== -1) {
    arrOfOrders.splice(itemIndex, 1); // Remove the item from the order
  }
}

// this function is only handling pushing orders to array of orders 
function handleAddBtnClick(itemId) {

  const singleItemOrderObj = menuArray.filter(function(item) {
    return itemId === item.id.toString()
  })[0]

  // if single object found, then add it to the orders array 
  if (singleItemOrderObj) {
    arrOfOrders.push(singleItemOrderObj)
  }

}

function getTotalOrder() {
  const totalPrice = getTotalPrice()
  const totalPriceElement = document.getElementById('total-price')

  if (arrOfOrders.length > 0) {
    totalPriceElement.textContent = `$${totalPrice}`
  } else {
    totalPriceElement.textContent = `$0`
  }
}

function addCheckOutElement() {
  const totalPrice = getTotalPrice()
  const checkoutWrapper = document.querySelector(".complete-order-btn-wrapper")

  if (totalPrice > 0) {
    // if the div wrapper for btn does not exist, is falsy, then create the elements 
    if(!checkoutWrapper) {
      const div = document.createElement("div")
      const completeOrderBtn = document.createElement("button")
      completeOrderBtn.textContent = "Complete Order"
      completeOrderBtn.classList.add("complete-order-btn")
      div.classList.add("complete-order-btn-wrapper")
      document.getElementById('order-items-container').append(div)
      div.appendChild(completeOrderBtn)
    }
    // but if it does exist, then remove it - this should help with the complete order from rendering each time item is added to order
  } else if(checkoutWrapper) {
    checkoutWrapper.remove()
  }

}

function updateOrderSection() {

  const orderSection = arrOfOrders.map((itemOrder) => {
    const {name, price, id} = itemOrder
    return `
      <div class="order-details-container">
        <div class="order-details-wrapper">
        <p class="added-item-name">${name}</p>
        <div class="btn-center">
          <button class="rm-btn" data-remove=${id}>remove</button>
        </div>
        </div>
        <div class="price-wrapper">
          <p class="added-item-price">$${price}</p>
        </div>
      </div>
    `
  }).join("")

  document.getElementById('order-container').innerHTML = orderSection

}
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


// function to store getting the total price 
function getTotalPrice() {
  const totalPrice = arrOfOrders.reduce((total, currentFoodItem) => {
    return total + currentFoodItem.price
  }, 0)

  return totalPrice
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
