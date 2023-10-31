
import { menuArray } from "./data";

let arrOfOrders = []

document.addEventListener('click', function(e) {
  if (e.target.dataset.add) {
    handleAddBtnClick(e.target.dataset.add)
    orderCalls()
  } else if (e.target.dataset.remove) {
    handleRemoveBtnClick(e.target.dataset.remove) 
    orderCalls()
  } else if (e.target.id === 'complete-order-btn') {
    handlePurchaseOrderClick()
  } else if (e.target.id === 'pay-btn') {
    handlePayment()
  }
})

// function to call all the nescessary functions
function orderCalls() {
    updateOrderSection()
    getTotalOrder()
    addCheckOutElement()
}

function handlePayment() {
  const orderItemsContainer = document.getElementById('order-items-container')
  const nameInput = document.querySelector('input[type="text"][placeholder="Enter your name"]')
  const name = nameInput.value

  if (name) {
    // safer than using innerHTML to inject infomration from input
        // Create the new elements
        const orderCompleteWrapper = document.createElement('div');
        orderCompleteWrapper.classList.add('order-complete-wrapper');
    
        const paymentComplete = document.createElement('p');
        paymentComplete.classList.add('payment-complete');
        paymentComplete.textContent = `Thanks ${name}! Your order is on its way`;

        const starRating = createStarRating()


        // Append elements to the order container
        const orderContainer = document.getElementById('order-items-container');
        orderContainer.innerHTML = ''; // Clear existing content
        orderCompleteWrapper.appendChild(paymentComplete);
        orderCompleteWrapper.appendChild(starRating)
        orderContainer.appendChild(orderCompleteWrapper);

    
        // Hide the pay modal
        const payModal = document.getElementById('pay-modal-inner');
        payModal.style.display = 'none';
  } else {
    alert("Please enter details before payment")
  }

}

function createStarRating() {
  const rateExperience = document.createElement('div');
  rateExperience.classList.add('payment-complete', "rating")
  rateExperience.innerHTML = 'Rate your experience';

  const starsContainer = document.createElement('div')
  starsContainer.classList.add('stars-container', "rating")

  const starIcons = [];
  for (let i = 0; i < 5; i++) {
   const starIcon = document.createElement("i")
   starIcon.classList.add('far', 'fa-light', 'fa-star')
   starIcons.push(starIcon);

   starIcon.addEventListener('click', function () {
    for (let j = 0; j <= i; j++) {
      if (starIcons[j].classList.contains('far')) {
        starIcons[j].classList.remove('far');
        starIcons[j].classList.add('fas'); // Use 'fas' for solid stars
      }
    }

    for (let j = i + 1; j < starIcons.length; j++) {
      starIcons[j].classList.remove('fas');
      starIcons[j].classList.add('far');
    }

            
    setTimeout(() => {
      arrOfOrders = []
      document.getElementById('order-items-container').innerHTML = renderTotalOrderSection()
    }, 4500)

  });

   starsContainer.appendChild(starIcon);
  }

  rateExperience.appendChild(starsContainer)
  return rateExperience

}

function handlePurchaseOrderClick() {
  const payModal = document.getElementById('pay-modal-inner')

  let payModalHtml = ``
  payModalHtml = ` 
              <h6 class="card-details-heading">Enter card details</h6>
              <form>
                <input type="text" placeholder="Enter your name" required/>
                <input type="text" placeholder="Enter card number" required/>
                <input type="text" placeholder="Enter CVV" required/>
              </form>
              <button type="submit" id="pay-btn" class="pay-btn">Pay</button>
          `
    payModal.innerHTML = payModalHtml
    payModal.style.display = 'flex'
  
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
  document.getElementById('order-items-container').innerHTML = renderTotalOrderSection()
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

render()
