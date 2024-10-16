import { allProductsUrl } from "./utils.js";

const fetchProducts = async () => {
  const resp = await fetch(allProductsUrl).catch((err) => console.log(err));
  if (resp) {
    return resp.json();
  }
  return resp;
};

export default fetchProducts;
