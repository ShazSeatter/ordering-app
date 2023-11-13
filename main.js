
import { handleAddBtnClick, handleRemoveBtnClick} from "./orders";
import { handlePayment, handlePurchaseOrderClick } from "./payments";
import { render } from "./renderUI";
import { orderCalls } from "./orderCalls";


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

render()

