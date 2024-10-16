// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";

// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-desc");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID;

// show product when page loads
window.addEventListener("DOMContentLoaded", async () => {
  const searchID = window.location.search;

  const resp = await fetch(`${singleProductUrl}${searchID}`);
  try {
    if (resp.status >= 200 && resp.status <= 299) {
      const data = await resp.json();
      const {
        id,
        fields: { colors, company, description: desc, name, price, image },
      } = data;
      productID = id;
      const img = image[0].thumbnails.large.url;

      document.title = `${name.toUpperCase()} | Comfy`;
      pageTitleDOM.textContent = `Home / ${name}`;
      imgDOM.src = img;
      titleDOM.textContent = name;
      companyDOM.textContent = `By ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = desc;
      colorsDOM.innerHTML = colors
        .map((item) => {
          return `<span class="product-color" style="background:${item}"></span>`;
        })
        .join("");
    } else {
      console.log(resp.status, resp.statusText);
      centerDOM.innerHTML = `<div><h3>no product</h3>
      <a href="index.html" class="btn">Back to home page</a>
      </div>`;
    }
  } catch (error) {
    console.log("ERROR");
  }
  loading.style.display = "none";
});

cartBtn.addEventListener("click", () => {
  addToCart(productID);
});
