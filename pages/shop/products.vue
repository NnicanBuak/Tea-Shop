<script setup>
	useHead({ title: 'Соцветие • Товары' })
	definePageMeta({
		hasDesktopHeader: {
			hid: 'hasDesktopHeader',
			name: 'hasDesktopHeader',
			content: true,
		},
		hasHeaderOffset: {
			hid: 'hasHeaderOffset',
			name: 'hasHeaderOffset',
			content: true,
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: true,
		},
	})

	const supabase = useSupabaseClient()

	let { data: products } = useAsyncData('productsData', async () => {
		let { data, error } = await supabase.from('products').select('*')
		if (error) {
			console.error('[Supabase] ' + error)
		} else return { data }
	})
</script>

<template>
	<main class="space-y-16">
		<section class="container xl:container-xl">
			<SearchByCategories />
		</section>
		<section
			class="container xl:container-xl grid grid-cols-1 gap-4 place-items-center"
			v-if="products.data"
		>
			<ProductCard
				v-for="product in products.data"
				:key="product.id"
				:image="product.image_url"
			/>
		</section>
	</main>
</template>

<script>
	export default {
		name: 'products',
	}
</script>
