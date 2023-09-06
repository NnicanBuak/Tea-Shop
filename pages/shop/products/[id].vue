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
	const isDescriptionOpen = ref(false)

	const product = ref(null)
	const selectedProductAmount = ref(1)

	watch(selectedProductAmount, (newValue) => {
		if (newValue < 1) {
			selectedProductAmount.value = 1
		} else if (newValue > product.value.on_aviable) {
			selectedProductAmount.value = product.value.on_aviable
		}
		console.log(product.value.on_aviable)
	})

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
	<main>
		<section class="wrapper h-48 w-full px-16 grid place-items-center">
			<nuxt-picture src="/img/logo-10.svg" />
		</section>
		<section class="container xl:container-xl space-y-16">
			<div class="wrapper grid place-items-center">
				<div
					class="-z-10 absolute left-0 bottom-40 h-[250px] w-[25vw] bg-primary bg-opacity-10"
				></div>
				<div
					class="h-[350px] w-[250px] animate-pulse grid place-items-center shadow-xl rounded-xl border-2 border-gray-300 bg-gray-200"
					v-if="isProductFetching"
					role="status"
				>
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
				<nuxt-img
					class="h-[350px] w-[250px] shadow-xl rounded-xl"
					v-else
					:src="product?.image_url"
					sizes="sm:250px xl:500px"
				/>
				<div
					class="-z-10 absolute top-[180px] -translate-x-3 h-[300px] w-[65vw] max-w-[250px] border-l-[3px] border-t-[3px] border-black"
				></div>
				<nuxt-picture
					class="absolute top-[220px] -translate-x-[150px]"
					src="/img/vkusno_tea.png"
					sizes="sm:15px"
				/>
			</div>
			<div class="wrapper mx-auto flex flex-col gap-y-8 items-center">
				<div class="absolute left-0 bg-primary"></div>
				<div class="wrapper">
					<h2 class="w-[250px] break-words">
						{{ product?.title }}
					</h2>
					<div class="wrapper mt-2 flex flex-col">
						<hr class="absolute right-0 w-[70vw]" />
						<p
							class="w-full pt-8 font-serif text-gray-700 break-words"
							:class="{ 'line-clamp-3': !isDescriptionOpen }"
						>
							{{ product?.description }}
						</p>
						<p
							class="w-fit mt-4 self-end font-sans text-xs border-b-2 border-secondary leading-none"
							v-show="!isDescriptionOpen"
							@click="isDescriptionOpen = true"
						>
							Читать дальше
						</p>
					</div>
				</div>
				<div class="wrapper space-y-4">
					<div
						class="h-[40px] max-w-[250px] flex rounded-md shadow-sm"
						role="group"
					>
						<select
							class="flex-grow wrapper p-0 pl-4 rounded-l-full border-gray-600 place-items-center text-sm font-medium text-gray-900 bg-gray-50 border-r-0 active:ring-4 active:ring-opacity-50 active:ring-primary2 active:border-primary2"
						>
							<option value="50">50 г.</option>
							<option value="100">100 г.</option>
							<option value="150">150 г.</option>
						</select>
						<div
							class="flex-grow wrapper flex items-center justify-between border-y border-gray-600 text-sm font-medium text-gray-900 bg-gray-50"
						>
							<button
								class="flex-grow text-primary disabled:text-gray-300 h-full"
								@click="selectedProductAmount -= 1"
								:disabled="selectedProductAmount <= 1"
							>
								<Icon name="material-symbols:remove-rounded" size="18"></Icon>
							</button>
							{{ selectedProductAmount }}
							<button
								class="flex-grow text-primary disabled:text-gray-300 h-full"
								@mousedown="selectedProductAmount += 1"
								:disabled="selectedProductAmount >= product?.value?.on_aviable"
							>
								<Icon name="material-symbols:add-rounded" size="18"></Icon>
							</button>
						</div>
						<div
							class="flex-grow justify-end wrapper pr-4 border border-l-0 border-gray-600 rounded-r-full grid place-items-center text-sm font-medium text-gray-900 bg-gray-50"
						>
							<span class="text-right">{{ product?.price + ' ₽' }}</span>
						</div>
					</div>
					<button type="button" class="button button-primary2 w-[250px]">
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
		<NewsletterSubscribingSection class="mt-12" />
	</main>
</template>
