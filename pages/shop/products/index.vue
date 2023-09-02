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
			content: false,
		},
	})

	const windowScroll = useWindowScroll()
	const supabase = useSupabaseClient()

	const products = ref([])
	const productsBySectionNew = ref([])
	const productsBySectionPromotion = ref([])
	const selectedProduct = ref(null)
	const isSearchFocused = ref(null)

	const isProductsFetching = ref(false)

	const fetchProducts = async () => {
		if (isProductsFetching.value) {
			return // Уже выполняется запрос, пропустить повторный вызов
		}

		isProductsFetching.value = true

		let { data, error } = await supabase.from('products').select('*')

		if (!error) {
			products.value = data || []
			productsBySectionNew.value = products.value.filter((product) => {
				return product.section === 'Новинки'
			})
			productsBySectionPromotion.value = products.value.filter((product) => {
				return product.section === 'Акции'
			})
		} else {
			console.error('[Supabase] ' + error.message)
			products.value = []
		}

		isProductsFetching.value = false
	}

	// const setSelectedProduct = () => {
	// 	if (route.params.id) {
	// 		selectedProduct.value =
	// 			products.value.find((product) => product.id === route.params.id) ||
	// 			undefined
	// 	}
	// }

	// const productsRef = ref([])
	// const filteredProductsRef = ref([])

	// onBeforeUpdate(() => {
	// 	filteredProductsRef.value = []
	// })

	// const setFilteredProductsRef = (item) => {
	// 	if (item) {
	// 		filteredProductsRef.value.push(item)
	// 		console.log(filteredProductsRef.value)
	// 	}
	// }

	// watch(route.params.id,  (newValue) => {
	// 	setSelectedProduct()
	// })

	// watchEffect(() => {
	// 	if (selectedProduct.value) {
	// 		selectedProduct.value.isExpanded = false
	// 		setTimeout(() => {
	// 			selectedProduct.value.isExpanded = true

	// 			products.value.forEach((product) => {
	// 				if (product.id !== selectedProduct.value.id) {
	// 					product.isExpanded = false
	// 				}
	// 			})
	// 		}, 1000)
	// 	}
	// })

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
		window.scrollTo({ top: 200, behavior: 'smooth' })
		if (filter) {
			category.value = filter.category
			search.value = filter.search
		} else {
			category.value = ''
			search.value = ''
		}
	}

	const handleSearchFocusing = (value) => {
		isSearchFocused.value = value
		if (isSearchFocused.value) window.scrollTo({ top: 200, behavior: 'smooth' })
	}

	// setSelectedProduct()
	fetchProducts()
</script>

<template>
	<main class="space-y-16" v-if="selectedProduct === null">
		<section
			class="w-full top-0 transition-spacing"
			:class="{
				'container xl:container-xl sticky': windowScroll.y.value <= 150,
				'p-3 z-30 sticky':
					windowScroll.y.value > 150 && windowScroll.y.value < 300,
				'p-3 z-30 fixed': windowScroll.y.value > 300,
			}"
		>
			<SearchByCategories
				:class="{ 'shadow-lg': windowScroll.y.value > 150 }"
				@filtering="handleFiltering($event)"
				@isSearchFocused="handleSearchFocusing($event)"
			/>
		</section>
		<section
			class="container xl:container-xl grid grid-cols-1 gap-4 place-items-center"
		>
			<div class="wrapper space-y-14" v-if="search || category">
				<h2 class="font-serif text-center" href="#Поиск" v-if="!category">
					Поиск
				</h2>
				<h2 class="font-serif text-center" :href="'#' + category">
					{{ category }}
				</h2>

				<div
					class="wrapper w-full space-y-12"
					v-if="filteredProducts.length > 0"
				>
					<ProductCard
						:ref="setFilteredProductsRef"
						v-for="product in filteredProducts"
						:key="product.id"
						:inStock="product.in_stock === undefined ? false : product.in_stock"
						:id="product.id"
						:image="product.image_url"
						:title="product.title"
						:price="product.price"
						:piece="product.piece_weight"
						:category="product.category"
						:teaVariety="product.tea_variety"
						:description="product.description"
						:search="search"
					/>
				</div>
				<div class="container xl:container-xl" v-else-if="products.length > 0">
					<h3 class="text-secondary text-center">Ничего не найдено.</h3>
				</div>
				<div class="container xl:container-xl" v-else>
					<h3 class="text-secondary text-center">
						Произошла ошибка или список товаров пуст.
					</h3>
				</div>
				<CustomDivider />
			</div>
			<div
				class="wrapper w-full"
				v-else-if="products.length > 0 || isProductsFetching"
			>
				<div class="wrapper w-full space-y-14">
					<div class="wrapper only:mt-14 space-y-8">
						<h2 class="font-serif text-center" href="#Новинки">Новинки</h2>

						<div v-if="isProductsFetching">
							<div
								class="w-full space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
								role="status"
							>
								<div
									class="wrapper flex flex-col h-[450px] font-bold text-2xl text-gray-200 leading-none overflow-hidden border-2 rounded-xl"
								>
									<div class="basis-2/5 grid place-items-center bg-gray-200">
										<svg
											class="w-12 h-12 text-gray-100"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 640 512"
										>
											<path
												d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
											/>
										</svg>
									</div>
									<div class="p-6 space-y-4 bg-white basis-3/5">
										<div class="h-8 w-full bg-gray-200 rounded-xl"></div>
										<div class="wrapper flex items-end">
											<div
												class="h-8 w-10 bg-gray-200 rounded-xl grid place-items-center"
											>
												<span class="text-white">₽</span>
											</div>
											<div class="h-5 w-10 ml-2 bg-gray-200 rounded-xl"></div>
										</div>
										<div class="wrapper space-y-2">
											<div class="h-4 w-full bg-gray-200 rounded-xl"></div>
											<div class="h-4 w-full bg-gray-200 rounded-xl"></div>
											<div class="h-4 w-1/2 bg-gray-200 rounded-xl"></div>
										</div>
										<div class="wrapper flex gap-2">
											<div
												class="h-8 w-14 bg-gray-200 rounded-full border-2 border-gray-300"
											></div>
											<div
												class="h-8 w-24 bg-gray-200 rounded-full border-2 border-gray-300"
											></div>
										</div>
									</div>
								</div>
								<span class="sr-only">Loading...</span>
							</div>
						</div>
						<div class="space-y-12 mt-10">
							<ProductCard
								v-for="product in productsBySectionNew"
								:key="product.id"
								:inStock="
									product.in_stock === undefined ? false : product.in_stock
								"
								:id="product.id"
								:image="product.image_url"
								:title="product.title"
								:price="product.price"
								:piece="product.piece_weight"
								:category="product.category"
								:teaVariety="product.tea_variety"
								:description="product.description"
								:search="search"
							/>
						</div>
						<CustomDivider />
					</div>
					<div class="wrapper only:mt-14 space-y-8">
						<h2 class="mt-16 font-serif text-center" href="#Акции">Акции</h2>

						<div class="wrapper" v-if="isProductsFetching">
							<div
								class="w-full space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
								role="status"
							>
								<div
									class="wrapper flex flex-col h-[450px] font-bold text-2xl text-gray-200 leading-none overflow-hidden border-2 rounded-xl"
								>
									<div class="basis-2/5 grid place-items-center bg-gray-200">
										<svg
											class="w-12 h-12 text-gray-100"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 640 512"
										>
											<path
												d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
											/>
										</svg>
									</div>
									<div class="p-6 space-y-4 bg-white basis-3/5">
										<div class="h-8 w-full bg-gray-200 rounded-xl"></div>
										<div class="wrapper flex items-end">
											<div
												class="h-8 w-10 bg-gray-200 rounded-xl grid place-items-center"
											>
												<span class="text-white">₽</span>
											</div>
											<div class="h-5 w-10 ml-2 bg-gray-200 rounded-xl"></div>
										</div>
										<div class="wrapper space-y-2">
											<div class="h-4 w-full bg-gray-200 rounded-xl"></div>
											<div class="h-4 w-full bg-gray-200 rounded-xl"></div>
											<div class="h-4 w-1/2 bg-gray-200 rounded-xl"></div>
										</div>
										<div class="wrapper flex gap-2">
											<div
												class="h-8 w-14 bg-gray-200 rounded-full border-2 border-gray-300"
											></div>
											<div
												class="h-8 w-24 bg-gray-200 rounded-full border-2 border-gray-300"
											></div>
										</div>
									</div>
								</div>
								<span class="sr-only">Loading...</span>
							</div>
						</div>
						<div class="space-y-12 mt-10">
							<ProductCard
								v-for="product in productsBySectionPromotion"
								:key="product.id"
								:inStock="
									product.in_stock === undefined ? false : product.in_stock
								"
								:id="product.id"
								:image="product.image_url"
								:title="product.title"
								:price="product.price"
								:piece="product.piece_weight"
								:category="product.category"
								:teaVariety="product.tea_variety"
								:description="product.description"
								:search="search"
							/>
						</div>
						<CustomDivider />
					</div>
				</div>
				<div class="wrapper w-full space-y-14">
					<div class="wrapper only:mt-14 space-y-8">
						<h2 class="font-serif text-center" href="#Ассортимент">
							Ассортимент
						</h2>

						<div class="wrapper" v-if="isProductsFetching">
							<div
								class="w-full space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
								role="status"
							>
								<div
									class="wrapper flex flex-col h-[500px] font-bold text-2xl text-gray-200 leading-none overflow-hidden border-2 rounded-xl"
								>
									<div class="basis-2/5 grid place-items-center bg-gray-200">
										<svg
											class="w-12 h-12 text-gray-100"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 640 512"
										>
											<path
												d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
											/>
										</svg>
									</div>
									<div class="p-6 space-y-4 bg-white basis-3/5">
										<div class="h-8 w-full bg-gray-200 rounded-xl"></div>
										<div class="wrapper flex items-end">
											<div
												class="h-8 w-10 bg-gray-200 rounded-xl grid place-items-center"
											>
												<span class="text-white">₽</span>
											</div>
											<div class="h-5 w-10 ml-2 bg-gray-200 rounded-xl"></div>
										</div>
										<div class="wrapper space-y-2">
											<div class="h-4 w-full bg-gray-200 rounded-xl"></div>
											<div class="h-4 w-full bg-gray-200 rounded-xl"></div>
											<div class="h-4 w-1/2 bg-gray-200 rounded-xl"></div>
										</div>
										<div class="wrapper flex gap-2">
											<div
												class="h-8 w-14 bg-gray-200 rounded-full border-2 border-gray-300"
											></div>
											<div
												class="h-8 w-24 bg-gray-200 rounded-full border-2 border-gray-300"
											></div>
										</div>
									</div>
								</div>
								<span class="sr-only">Loading...</span>
							</div>
						</div>
						<div class="wrapper" v-if="isProductsFetching">
							<div
								class="w-full space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
								role="status"
							>
								<div
									class="wrapper flex flex-col h-[500px] font-bold text-2xl text-gray-200 leading-none overflow-hidden border-2 rounded-xl"
								>
									<div class="basis-2/5 grid place-items-center bg-gray-200">
										<svg
											class="w-12 h-12 text-gray-100"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 640 512"
										>
											<path
												d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
											/>
										</svg>
									</div>
									<div class="p-6 space-y-4 bg-white basis-3/5">
										<div class="h-8 w-full bg-gray-200 rounded-xl"></div>
										<div class="wrapper flex items-end">
											<div
												class="h-8 w-10 bg-gray-200 rounded-xl grid place-items-center"
											>
												<span class="text-white">₽</span>
											</div>
											<div class="h-5 w-10 ml-2 bg-gray-200 rounded-xl"></div>
										</div>
										<div class="wrapper space-y-2">
											<div class="h-4 w-full bg-gray-200 rounded-xl"></div>
											<div class="h-4 w-full bg-gray-200 rounded-xl"></div>
											<div class="h-4 w-1/2 bg-gray-200 rounded-xl"></div>
										</div>
										<div class="wrapper flex gap-2">
											<div
												class="h-8 w-14 bg-gray-200 rounded-full border-2 border-gray-300"
											></div>
											<div
												class="h-8 w-24 bg-gray-200 rounded-full border-2 border-gray-300"
											></div>
										</div>
									</div>
								</div>
								<span class="sr-only">Loading...</span>
							</div>
						</div>
						<div class="space-y-12 mt-10">
							<ProductCard
								v-for="product in products"
								:key="product.id"
								:inStock="
									product.in_stock === undefined ? false : product.in_stock
								"
								:id="product.id"
								:image="product.image_url"
								:title="product.title"
								:price="product.price"
								:piece="product.piece_weight"
								:category="product.category"
								:teaVariety="product.tea_variety"
								:description="product.description"
								:search="search"
							/>
						</div>
						<CustomDivider />
					</div>
				</div>
			</div>
			<!-- <div
				class="container xl:container-xl grid place-items-center"
				v-else-if="isProductsFetching"
			>
				<Icon name="eos-icons:bubble-loading" size="64" />
			</div> -->
			<div class="container xl:container-xl" v-else>
				<h3 class="text-secondary text-center">
					Произошла ошибка или список товаров пуст.
				</h3>
			</div>
		</section>
		<NewsletterSubscribingSection />
	</main>
	<main v-else>{{ selectedProduct.value }}</main>
</template>
