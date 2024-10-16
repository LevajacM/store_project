import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupSearch = (store) => {
  const form = getElement(".input-form");
  const input = getElement(".search-input");
  form.addEventListener("keyup", () => {
    const value = input.value;
    if (value) {
      const newStore = store.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      display(newStore, getElement(".products-container"), true);
      if (newStore.length < 1) {
        const p = getElement(".products-container");
        p.innerHTML = `<h3>Sorry, no products matched your search</h3>`;
      }
    } else {
      display(store, getElement(".products-container"), true);
    }
  });
};

export default setupSearch;
