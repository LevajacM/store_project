import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupPrice = (store) => {
  const priceFilter = getElement(".price-filter");
  const priceValue = getElement(".price-value");
  let maxPrice = store.map(({ price }) => {
    return price;
  });
  maxPrice = Math.max(...maxPrice);
  priceFilter.value = Math.ceil(maxPrice / 100);
  priceFilter.max = Math.ceil(maxPrice / 100);
  priceFilter.min = 0;
  priceValue.textContent = `Value : $${Math.ceil(maxPrice / 100)}`;

  priceFilter.addEventListener("input", () => {
    let value = parseInt(priceFilter.value);
    priceValue.textContent = `Value : $${value}`;
    let priceStore = store.filter((item) => value >= item.price / 100);
    display(priceStore, getElement(".products-container"), true);
    if (priceStore.length < 1) {
      const p = getElement(".products-container");
      p.innerHTML = `<h3>Sorry, no products matched your search</h3>`;
    }
  });
};

export default setupPrice;
