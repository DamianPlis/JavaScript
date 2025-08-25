import {cart} from "../cart.js"
import { products,matchProduct } from "../../data/products.js"
import { formatCurrency } from "../utilities/formatCurrency.js"
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import {deliveryOptions,getDeliveryOptionInfo} from "../../data/deliveryOptions.js"

function renderOrderSummary() {
    let html = ""; // Initialize HTML outside the loop

    cart.forEach(cartItem => {
        const fullProduct = matchProduct(cartItem.productId);


        const dateString = getDeliveryDateString(cartItem.deliveryOptionId)

        html += `
        <div class="cart-item-container">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${fullProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${fullProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(fullProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" ${checked("1", cartItem)} class="delivery-option-input" name="${cartItem.productId}">
                    <div>
                    <div class="delivery-option-date">
                        ${getDeliveryDateString("1")}
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" ${checked("2", cartItem)} class="delivery-option-input" name="${cartItem.productId}">
                    <div>
                    <div class="delivery-option-date">
                        ${getDeliveryDateString("2")}
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" ${checked("3", cartItem)} class="delivery-option-input" name="${cartItem.productId}">
                    <div>
                    <div class="delivery-option-date">
                        ${getDeliveryDateString("3")}
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        `

    });

    function getDeliveryDateString(deliveryOptionId) {
            // Get the delivery option and use the dayjs library to format dates
            const deliveryOptionInfo = getDeliveryOptionInfo(deliveryOptionId);
            const deliveryDate = dayjs().add(deliveryOptionInfo.deliveryDays, "days");
            const dateString = deliveryDate.format("dddd, MMMM D");
            return dateString
    }

    function checked (number, cartItem) {
        if (cartItem.deliveryOptionId === number) {
            return "checked"
        } else {
            return ""
        }
    }

    document.querySelector("#checkout-grid").innerHTML = html
}

export default renderOrderSummary;
