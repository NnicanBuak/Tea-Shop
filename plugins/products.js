import products from "~~/assets/products.json";

export default ({ app }, inject) => {
	inject("products", Object.values(products));
};
