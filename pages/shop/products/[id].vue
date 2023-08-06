<script setup>
	useHead({ title: 'Соцветие • Товар' })

	definePageMeta({
		hasDesktopHeader: {
			hid: 'hasDesktopHeader',
			name: 'hasDesktopHeader',
			content: true,
		},
		hasHeaderOffset: {
			hid: 'hasHeaderOffset',
			name: 'hasHeaderOffset',
			content: false,
		},
		headerOffsetTitle: {
			hid: 'headerOffsetTitle',
			name: 'headerOffsetTitle',
			content: '',
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: false,
		},
	})

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
	<main class="space-y-16">
		<div class="wrapper h-48 w-full px-16 grid place-items-center">
			<nuxt-picture src="/img/logo-10.svg" />
		</div>
		<section class="container xl:container-xl space-y-12">
			<div class="wrapper grid place-items-center">
				<nuxt-img
					class="h-[350px] w-[250px] shadow-xl rounded-xl"
					:src="product?.image_url ? product?.image_url : '/img/pattern-02.png'"
					height="350"
					width="250"
				/>
			</div>
			<div class="wrapper flex flex-col gap-y-8 items-center">
				<h2 class="w-[250px] break-words">
					{{ product?.title }}
				</h2>
				<p
					class="w-full pl-9 font-serif text-gray-700 line-clamp-3 break-words"
				>
					{{ product?.description }}
				</p>
				<div class="wrapper space-y-4">
					<div class="w-[250px] inline-flex rounded-md shadow-sm" role="group">
						<select
							class="wrapper rounded-l-xl shrink p-2 inline-block place-items-center text-sm font-medium text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-full"
						>
							<option value="50">50 г.</option>
							<option value="100">100 г.</option>
							<option value="150">150 г.</option>
						</select>
						<div
							class="wrapper p-2 grid place-items-center text-sm font-medium text-gray-900 bg-white"
						>
							-1+
						</div>
						<div
							class="wrapper rounded-r-xl p-2 grid place-items-center text-sm font-medium text-gray-900 bg-white"
						>
							<span class="">{{ product?.price + ' ₽' }}</span>
						</div>
					</div>
					<button class="button button-primary2 w-[250px]" type="button">
						<Icon
							class="mr-2"
							name="material-symbols:add-shopping-cart-outline-rounded"
							size="24"
						/>
						<span>В корзину</span>
					</button>
				</div>
			</div>
		</section>
		<NewsletterSubscribingSection />
	</main>
</template>
