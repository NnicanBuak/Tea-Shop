import productsData from '~/assets/products.json'

const getProducts = async () => {
	return productsData
}

export default defineEventHandler(getProducts)
