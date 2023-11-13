let arrOfOrders = []

function setArrOfOrders(newOrders) {
    arrOfOrders = newOrders.slice()
}

function getArrOfOrders() {
    return arrOfOrders.slice()
}

export {setArrOfOrders, getArrOfOrders}