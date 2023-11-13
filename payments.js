
  import { createStarRating } from "./orders"
  
  // function handling when 'complete order' has been clicked to render card details modal
  function handlePurchaseOrderClick() {
    const payModal = document.getElementById('pay-modal-inner')
  
    let payModalHtml = ``
    payModalHtml = ` 
                <button class="card-modal-close-btn" id="card-modal-close-btn">X</button>
  
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
    
      const closeModal = document.getElementById('card-modal-close-btn')
  
      closeModal.addEventListener('click', function() {
        payModal.style.display = 'none'
      })
  }

// function to handle displaying that payment has gone through 
function handlePayment() {
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


  export {handlePurchaseOrderClick, handlePayment}