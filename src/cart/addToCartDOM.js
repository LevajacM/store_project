import { formatPrice, getElement } from "../utils.js";

const cartItems = getElement(".cart-items");

const addToCartDOM = (product) => {
  const { id, img, name, price, amount } = product;
  const element = document.createElement("article");
  element.innerHTML = `
            <article class="cart-item" data-id=${id}>
            <img
              src=${img}
              alt=${name}
              class="cart-item-img"
            />
            <!-- item info -->
            <div>
              <h4 class="cart-item-name">${name}</h4>
              <p class="cart-item-price">${formatPrice(price)}</p>
              <button class="cart-item-remove-btn" data-id="${id}">remove</button>
            </div>
            <!-- amount toggle -->
            <div>
              <button class="cart-item-increase-btn" data-id="${id}">
                <i class="fa-solid fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount" data-id="${id}">${amount}</p>
              <button class="cart-item-decrease-btn" data-id="${id}">
                <i class="fa-solid fa-chevron-down"></i>
              </button>
            </div>
          </article>`;
  cartItems.appendChild(element);
};

export default addToCartDOM;
