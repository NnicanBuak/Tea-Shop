<script setup>
	const { id } = useRoute().params
	const supabase = useSupabaseClient()

	const product = ref(null)

	const isProductFetching = ref(false)

	const fetchProduct = async () => {
		if (isProductFetching.value) {
			return // Уже выполняется запрос, пропустить повторный вызов
		}

		isProductFetching.value = true

		let { data, error } = await supabase
			.from('products')
			.select('*')
			.eq('id', id)

		if (!error) {
			product.value = data[0]
		} else {
			console.error('[Supabase] ' + error.message)
			product.value = null
		}

		isProductFetching.value = false
	}

	fetchProduct()
</script>

<template>
	<main class="container xl:container-xl">
		<h2>{{ product.title }}</h2>
	</main>
</template>
