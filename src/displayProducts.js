import { formatPrice, getElement } from "./utils.js";
import { addToCart } from "./cart/setupCart.js";
const display = (data, element, filters) => {
  element.innerHTML = data
    .map(({ img, name, id, price }) => {
      return `<article class="product">
            <div class="product-container">
              <img
                src=${img}
                class="product-img img"
                alt=${name}
              />
              <div class="product-icons">
                <a href="product.html?id=${id}" class="product-icon">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </a>
                <button class="product-cart-btn product-icon" data-id=${id}>
                  <i class="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
            <footer>
              <p class="product-name">${name}</p>
              <h4 class="product-price">${formatPrice(price)}</h4>
            </footer>
          </article>`;
    })
    .join("");
  if (filters) {
    return;
  }
  element.addEventListener("click", (e) => {
    if (e.target.parentElement.classList.contains("product-cart-btn")) {
      const id = e.target.parentElement.dataset.id;
      addToCart(id);
    }
  });
};

export default display;
