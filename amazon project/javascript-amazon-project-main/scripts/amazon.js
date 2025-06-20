import { products } from "../data/products.js"
import { formatCurrency } from "../utilities/formatCurrrency.js"
import { addToCart } from "cart.js"
console.log(products)

let html = ""
/*
for (let i = 0; i < products.length; i++) {
    html += 
    `<div class="product-container" id=${products[i].id}>
        <div class="product-image-container">
          <img class="product-image" src="${products[i].image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${products[i].name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-45.png">
          <div class="product-rating-count link-primary">
            ${products[i].rating.count}
          </div>
        </div>

        <div class="product-price">
          $${products[i].priceCents / 10}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary">
          Add to Cart
        </button>
      </div>`
    document.querySelector(".products-grid").innerHTML = html
}
*/


products.forEach((products, i) => {
  html +=
    `<div class="product-container" id=${products.id}>
        <div class="product-image-container">
          <img class="product-image" src="${products.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${products.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${products.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${products.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(products.priceCents / 100).toFixed(2)}c
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button id="add-to-cart" class="add-to-cart-button button-primary" data-product-id=${products.id}>
          Add to Cart
        </button>
      </div>`
  document.querySelector(".products-grid").innerHTML = html
});

document.querySelectorAll("#add-to-cart").forEach((buttonElem) => {
  buttonElem.addEventListener("click", () => {

    const productId = buttonElem.dataset.productId
    addToCart(productId)
    updateCartCount()

  })
})

function updateCartCount() {
  let cartQuantity = 0

  cart.forEach(cartItem => {
    cartQuantity = cartItem.quantity
  });

  document.getElementById("cart-quantity").innerHTML = cartQuantity
}