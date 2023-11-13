import { menuArray } from "./data"
import { setArrOfOrders, getArrOfOrders } from "./arrOfOrders"
import {renderTotalOrderSection} from "./renderUI"

let orders = getArrOfOrders()

// this function is only handling pushing orders to array of orders 
function handleAddBtnClick(itemId) {
    const singleItemOrderObj = menuArray.filter(function(item) {
      return itemId === item.id.toString()
    })[0]
  
    // if single object found, then add it to the orders array 
    if (singleItemOrderObj) {
      orders.push(singleItemOrderObj)
    }
  
  }
  
  // function handling updating order section
  function updateOrderSection() {
   
    const orderSection = orders.map((itemOrder) => {
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


// function to remove an order from the list of orders
function handleRemoveBtnClick(itemId) {
    // finding what index the item in question is at in the array of orders (so it knows what index to remove)
    const itemIndex = orders.findIndex((item) => itemId === item.id.toString());
  
    // !== -1 means a value has been found
    if (itemIndex !== -1) {
      orders.splice(itemIndex, 1); // Remove the item from the order
    }
  }


// getting total order
function getTotalOrder() {
    const totalPrice = calculateTotalPrice()
    const totalPriceElement = document.getElementById('total-price')
  
    if (orders.length > 0) {
      totalPriceElement.textContent = `$${totalPrice}`
    } else {
      totalPriceElement.textContent = `$0`
    }
    }

    function addCheckOutElement() {
        const totalPrice = calculateTotalPrice()
        const checkoutWrapper = document.querySelector(".complete-order-btn-wrapper")
      
        if (totalPrice > 0) {
          // if the div wrapper for btn does not exist, is falsy, then create the elements 
          if(!checkoutWrapper) {
            const div = document.createElement("div")
            const completeOrderBtn = document.createElement("button")
            completeOrderBtn.textContent = "Complete Order"
            completeOrderBtn.classList.add("complete-order-btn")
            completeOrderBtn.id = "complete-order-btn"
            div.classList.add("complete-order-btn-wrapper")
            document.getElementById('order-items-container').append(div)
            div.appendChild(completeOrderBtn)
          } 
          // but if it does exist, then remove it - this should help with the complete order from rendering each time item is added to order
        } else if(checkoutWrapper) {
          checkoutWrapper.remove()
        }
      }
    

// function to store getting the total price 
function calculateTotalPrice() {
    const totalPrice = orders.reduce((total, currentFoodItem) => {
      return total + currentFoodItem.price
    }, 0)
  
    return totalPrice
  }


// rating experience - clears array of orders to empty array on settimeout call back
  function createStarRating() {
    const rateExperience = document.createElement('div');
    rateExperience.classList.add('payment-complete', "rating")
    rateExperience.innerHTML = 'Rate your experience'
  
    const starsContainer = document.createElement('div')
    starsContainer.classList.add('stars-container', "rating")
  
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
     const starIcon = document.createElement("i")
     starIcon.classList.add('far', 'fa-light', 'fa-star')
     starIcons.push(starIcon)
  
     starIcon.addEventListener('click', function () {
      for (let j = 0; j <= i; j++) {
        if (starIcons[j].classList.contains('far')) {
          starIcons[j].classList.remove('far')
          starIcons[j].classList.add('fas') // Use 'fas' for solid stars
        }
      }
  
      // removing the stars
      for (let j = i + 1; j < starIcons.length; j++) {
        starIcons[j].classList.remove('fas')
        starIcons[j].classList.add('far')
      }
         
      setTimeout(() => {
        setArrOfOrders([])
        orders = getArrOfOrders()
        document.getElementById('order-items-container').innerHTML = renderTotalOrderSection()
      }, 4500)
  
    })
  
     starsContainer.appendChild(starIcon)
    }
  
    rateExperience.appendChild(starsContainer)
    return rateExperience
  
  }

export {handleAddBtnClick, updateOrderSection, handleRemoveBtnClick, getTotalOrder,  addCheckOutElement, calculateTotalPrice, createStarRating}