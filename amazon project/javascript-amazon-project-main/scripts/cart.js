// Just the cart
export let cart = JSON.parse(localStorage.getItem("cart")) || []


// a function to add to local storage
function saveLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart))
}