import { matchProduct } from "../data/products.js"
import { formatCurrency } from "./utilities/formatCurrency.js"
// Just the cart
export let cart = JSON.parse(localStorage.getItem("cart")) || []

export function addToCart(productId) {
    let matchingItem
    //find a matched item in the cart
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    // if it exists (true) then update the quantity
    if (matchingItem) {
        matchingItem.quantity++
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOption: "1",
        })
    }
    saveLocalStorage()
}

// a function to add to local storage
function saveLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart))
}