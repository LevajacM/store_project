// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItems = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");
const cartOverlay = getElement(".cart-overlay");

let cartStore = getStorageItem("cartStore");

export const addToCart = (id) => {
  let storeItem = cartStore.find((item) => item.id === id);
  if (!storeItem) {
    let product = findProduct(id);
    product = { ...product, amount: 1 };
    cartStore = [...cartStore, product];
    addToCartDOM(product);
  } else {
    const amount = increaseAmount(id);
    const cartItemValues = [...cartItems.querySelectorAll(".cart-item-amount")];
    cartItemValues.map((item) => {
      if (item.dataset.id === id) {
        item.textContent = amount;
      }
    });
  }
  displayCartCount();

  displayTotalPrice();

  setStorageItem("cartStore", cartStore);

  openCart();
};

function displayCartCount() {
  const amount = cartStore.reduce((tot, cur) => {
    tot += cur.amount;
    return tot;
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayTotalPrice() {
  const total = cartStore.reduce((tot, cur) => {
    tot += cur.price * cur.amount;
    return tot;
  }, 0);
  cartTotalDOM.textContent = `total : ${formatPrice(total)}`;
}

function displayCartProducts() {
  const cartItemsList = getStorageItem("cartStore");
  cartItemsList.forEach((item) => {
    addToCartDOM(item);
  });
}

function increaseAmount(id) {
  let newAmount;
  cartStore.map((item) => {
    if (item.id === id) {
      item.amount = item.amount + 1;
      newAmount = item.amount;
    }
    return item;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cartStore.map((item) => {
    if (item.id === id) {
      item.amount = item.amount - 1;
      newAmount = item.amount;
    }
    return item;
  });
  return newAmount;
}

function removeItemFromCart(id) {
  cartStore = cartStore.filter((item) => item.id !== id);
  // cartStore.map((item, index) => {
  //   if (item.id === id) {
  //     cartStore.splice(index, 1);
  //   }
  //   return item;
  // });
}

function cartFunctionality() {
  cartItems.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const parentId = e.target.parentElement.dataset.id;
    // REMOVE ITEM
    if (e.target.classList.contains("cart-item-remove-btn")) {
      console.log("dddd");
      removeItemFromCart(id);
      e.target.parentElement.parentElement.remove();
    }
    // INCREASE
    if (e.target.classList.contains("fa-chevron-up")) {
      const amount = increaseAmount(parentId);
      e.target.parentElement.nextElementSibling.textContent = amount;
    }
    // DECREASE
    if (e.target.classList.contains("fa-chevron-down")) {
      const amount = decreaseAmount(parentId);
      if (amount < 1) {
        removeItemFromCart(parentId);
        e.target.parentElement.parentElement.parentElement.remove();
      } else {
        e.target.parentElement.previousElementSibling.textContent = amount;
      }
    }
    displayCartCount();
    displayTotalPrice();
    setStorageItem("cartStore", cartStore);
    if (cartStore.length < 1) {
      cartOverlay.classList.remove("show");
    }
    return;
  });
}

const init = () => {
  displayCartCount();
  displayTotalPrice();
  displayCartProducts();
  cartFunctionality();
};

init();
