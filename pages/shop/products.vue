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
		headerOffsetTitle: {
			hid: 'headerOffsetTitle',
			name: 'headerOffsetTitle',
			content: 'Товары',
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: true,
		},
	})

	const windowScroll = useWindowScroll()
	const route = useRoute()
	const supabase = useSupabaseClient()

	const products = ref([])
	const selectedProduct = ref(null)

	const fetchProducts = async () => {
		let { data, error } = await supabase.from('products').select('*')

		if (error) {
			console.error('[Supabase] ' + error.message)
			return []
		}

		products.value = data || []
	}

	const setSelectedProduct = () => {
		if (route.params.id && products.value.length) {
			selectedProduct.value =
				products.value.find((product) => product.id === route.params.id) ||
				undefined
		}
	}

	watch(
		() => route.params.id,
		() => {
			setSelectedProduct()
		},
	)

	watch(
		() => selectedProduct.value,
		(newProduct) => {
			if (newProduct) {
				newProduct.isExpanded = false
				setTimeout(() => {
					newProduct.isExpanded = true

					products.value.forEach((product) => {
						if (product.id !== newProduct.id) {
							product.isExpanded = false
						}
					})
				}, 1000)
			}
		},
		{ deep: true },
	)

	const category = ref('')
	const search = ref('')

	const filteredProducts = computed(() => {
		if (!products.value.length) {
			return []
		}

		return category.value || search.value
			? products.value.filter((product) =>
					category.value
						? product.category === category.value
						: search.value
								.toLowerCase()
								.split(' ')
								.filter((word) => word !== '')
								.some((searchWord) => {
									return product.title.toLowerCase().includes(searchWord)
								}),
			  )
			: products.value
	})

	const handleFiltering = (filter) => {
		if (filter) {
			category.value = filter.category
			search.value = filter.search
		} else {
			category.value = ''
			search.value = ''
		}
	}

	fetchProducts()
	setSelectedProduct()
</script>

<template>
	<main class="space-y-16" v-if="selectedProduct === null">
		<section
			class="xl:container-xl sticky top-0 transition-spacing"
			:class="{
				container: windowScroll.y.value <= 150,
				'p-3': windowScroll.y.value > 150,
			}"
		>
			<SearchByCategories
				:class="{ 'shadow-lg': windowScroll.y.value > 150 }"
				@filtering="handleFiltering($event)"
			/>
		</section>
		<section
			class="container xl:container-xl grid grid-cols-1 gap-4 place-items-center"
			v-if="filteredProducts && filteredProducts.length > 0"
		>
			<ProductCard
				v-for="product in filteredProducts"
				:key="product.id"
				v-show="product.inStock && !product.isExpanded"
				:id="product.id"
				:image="product.image_url"
				:title="product.title"
				:price="product.price"
				:piece="product.piece_weight"
				:category="product.category"
				:teaVariety="product.tea_variety"
				:search="search"
			/>
		</section>
		<section class="container xl:container-xl" v-else-if="products">
			<h1 class="text-secondary text-center">Ничего не найдено.</h1>
		</section>
		<section class="container xl:container-xl" v-else>
			<h1 class="text-secondary text-center">
				Произошла ошибка или список товаров пуст.
			</h1>
		</section>
		<NewsletterSubscribingSection />
	</main>
	<main v-else>{{ selectedProduct.value }}</main>
</template>

<script>
	export default {
		name: 'products',
		emits: ['filtering'],
	}
</script>
