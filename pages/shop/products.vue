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
	const products = ref(null)
	const selectedProduct = ref(undefined) // use undefined instead of null

	useAsyncData('products', async () => {
		let { data, error } = await supabase.from('products').select('*')
		if (error) console.error('[Supabase] ' + error)

		products.value = data || [] // use empty array if data is falsy

		// если существует параметр id в url и он существует в базе данных (data), то selectedProduct присвоить значение продукта
		if (route.params.id && data)
			selectedProduct.value = data.find(
				(product) => product.id === route.params.id,
			)
	})

	// watcher для изменения selectedProduct при изменении параметра id в url
	watch(
		() => route.params.id,
		(newId) => {
			if (products.value) {
				selectedProduct.value =
					products.value.find((product) => product.id === newId) || undefined // set to undefined if not found
			}
		},
	)

	const category = ref('')
	const search = ref('')

	const filteredProducts = computed(() => {
		if (!products.value) return [] // check if products.value exists first
		// фильтрация товаров по категории и поисковому запросу
		return category.value !== '' || search.value !== ''
			? products.value.filter((product) =>
					category.value !== ''
						? product.category === category.value
						: search.value
								.toLowerCase()
								.split(' ')
								.filter((word) => word !== '')
								.some((searchWord) =>
									product.title.toLowerCase().includes(searchWord),
								),
			  )
			: products.value
	})

	const handleFiltering = (filter) => {
		// установить реактивные значения категории и поискового запроса
		if (filter) {
			category.value = filter.category
			search.value = filter.search
		} else {
			category.value = ''
			search.value = ''
		}
	}
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
		<section v-else-if="products.value">
			<h1 class="text-secondary text-center">Ничего не найдено.</h1>
		</section>
		<section v-else>
			<h1 class="text-secondary text-center">
				Произошла ошибка или список товаров пуст.
			</h1>
		</section>
	</main>
	<main v-else>{{ selectedProduct.value }}</main>
</template>

<script>
	export default {
		name: 'products',
		emits: ['filtering'],
		selectedProduct: {
			// при изменении selectedProduct, установить флаг для скрытия всех товаров кроме выбранного, после таймаута для анимации установить флаг для раскрытия текущего элемента товара на весь экран и скрытия остальных элементов

			handler: (ref) => {
				const product = ref.value
				if (product) {
					product.isExpanded = false
					setTimeout(() => {
						product.isExpanded = true
						products.value?.forEach((comparableProduct) => {
							if (comparableProduct.id !== product.id)
								product.product.isExpanded = false
						})
					}, 1000)
				}
			},
			deep: true,
		},
	}
</script>
