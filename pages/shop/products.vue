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
	const products = ref(null)

	useAsyncData('products', async () => {
		let { data, error } = await supabase.from('products').select('*')
		if (error) console.error('[Supabase] ' + error)
		else products.value = data
	})

	const search = ref('')
	const category = ref('')

	const filteredProducts = computed(() =>
		category.value !== '' || search.value !== ''
			? products.value.filter((item) =>
					category.value === ''
						? true
						: item.category === category.value &&
						  item.title.toLowerCase().includes(search.value.toLowerCase()),
			  )
			: products.value,
	)

	const handleFiltering = (filter) => {
		category.value = filter.category
		search.value = filter.search
	}
</script>

<template>
	<main class="space-y-16">
		<section class="container xl:container-xl">
			<SearchByCategories @filtering="handleFiltering($event)" />
		</section>
		<section
			class="container xl:container-xl grid grid-cols-1 gap-4 place-items-center"
			v-if="filteredProducts"
		>
			<ProductCard
				v-for="product in filteredProducts"
				:key="product.id"
				:id="product.id"
				:image="product.image_url"
				:title="product.title"
				:price="product.price"
				:piece="product.piece_weight"
				:category="product.category"
				:variety="product.tea_variety"
				:search="search"
			/>
		</section>
		<section v-else>
			<h1 class="text-secondary text-center">Ничего не найдено.</h1>
		</section>
	</main>
</template>

<script>
	export default {
		name: 'products',
		emits: ['filtering'],
		data() {
			return {
				selectedProduct: null,
			}
		},
		created() {
			if (this.$route.query.id) {
				this.selectedProduct = this.$route.query.id
			}
		},
	}
</script>
