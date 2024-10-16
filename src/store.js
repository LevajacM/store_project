import { getStorageItem, setStorageItem } from "./utils.js";

let store = getStorageItem("store");

const setupStore = (products) => {
  store = products.map((item) => {
    const { fields, id } = item;
    const { company, colors, featured, name, price, image } = fields;
    const img = image[0].thumbnails.large.url;
    return { id, company, colors, featured, name, price, img };
  });
  setStorageItem("store", store);
};

const findProduct = (id) => {
  let product = store.find((item) => item.id === id);
  return product;
};

export { store, setupStore, findProduct };
