
import {addCheckOutElement, updateOrderSection, getTotalOrder} from "./orders"

// function to call all the nescessary functions
function orderCalls() {
    updateOrderSection()
    getTotalOrder()
    addCheckOutElement()
}

export {orderCalls}