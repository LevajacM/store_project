import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupCompanies = (store) => {
  let companies = [
    "all",
    ...new Set(
      store.map(({ company }) => {
        return company;
      })
    ),
  ];
  const companiesContainer = getElement(".companies");
  companiesContainer.innerHTML = companies
    .map((item) => {
      return `<button class="company-btn">${item}</button>`;
    })
    .join("");

  companiesContainer.addEventListener("click", (e) => {
    const name = e.target.textContent;
    if (e.target.classList.contains("company-btn")) {
      const compStore = store.filter(({ company }) => name === company);
      display(compStore, getElement(".products-container"), true);
      if (compStore.length < 1) {
        display(store, getElement(".products-container"), true);
      }
    }
  });
};

export default setupCompanies;
