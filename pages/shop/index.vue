<script setup>
	definePageMeta({
		hasDesktopHeader: {
			hid: 'hasDesktopHeader',
			name: 'hasDesktopHeader',
			content: false,
		},
		hasHeaderOffset: {
			hid: 'hasHeaderOffset',
			name: 'hasHeaderOffset',
			content: false,
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: true,
		},
	})

	const client = useSupabaseClient()

	let { data: products, error: supabaseAPIError } = await client
		.from('products')
		.select('*')
	if (supabaseAPIError) console.error(supabaseAPIError)

	defineExpose({ products })
</script>

<template>
	<main class="space-y-40 overflow-auto">
		<section
			class="сontainer-xl h-screen grid"
			style="height: calc(100 * var(--vh, 1vh))"
			id="hero"
		>
			<aside
				class="h-full container xl:container-xl flex flex-col justify-between items-center lg:grid grid-cols-2 grid-rows-4 gap-x-22 xl:gap-x-40 max-lg:py-[16vh] xl:p-20 row-[1/-1] col-[1/-1]"
			>
				<nav class="max-lg:hidden flex flex-col lg:row-[1/1] lg:col-[2/2]">
					<div class="flex">
						<button type="button" @click="navigateTo('/shop/products')">
							<Icon
								class="text-secondary"
								name="material-symbols:search"
								size="32"
							/>
						</button>
						<button type="button" @click="navigateTo('/shop/cart')">
							<Icon
								class="text-secondary"
								name="material-symbols:shopping-bag-outline"
								size="32"
							/>
						</button>
					</div>
					<div class="flex">
						<button type="button" @click="navigateTo('/shop')">
							<span><b>Магазин</b></span>
						</button>
						<button type="button" @click="navigateTo('/other/sales')">
							<span>Скидки</span>
						</button>
						<button type="button" @click="navigateTo('/other/about')">
							<span>О нас</span>
						</button>
						<button type="button" @click="navigateTo('/other/contacts')">
							<span>Контакты</span>
						</button>
					</div>
				</nav>
				<nuxt-picture
					class="max-lg:hidden h-full w-fit self-center lg:row-[1/-1] lg:col-[1/1]"
					id="alt-logo"
					src="/img/logo-14.svg"
					alt=""
				/>
				<div
					class="flex flex-col justify-center items-center gap-10"
					id="title"
				>
					<nuxt-picture
						class="lg:hidden w-full"
						id="logo"
						src="/img/logo-10.svg"
						alt=""
					/>
					<h4 class="lg:hidden w-full font-normal text-black text-center">
						<span> Порой просто хочется начать день с чашечки </span>
						<NuxtLink
							class="transition-all font-bold text-transparent"
							:class="{
								'from-yellow-300 to-yellow-500':
									randomTea.variety === 'Зелёный',
								'from-white to-gray-200': randomTea.variety === 'Белый',
								'from-green-400 to-green-800':
									randomTea.variety === 'Травянной',
								'from-yellow-300 to-yellow-400': randomTea.variety === 'Улун',
								'from-orange-400 to-orange-600': randomTea.variety === 'Чёрный',
								'from-red-900 to-gray-900': randomTea.variety === 'Пуэр',
							}"
							data-pointer-type="highlight"
							v-if="randomTea?.parenthesesName"
							:to="{ path: '/shop/products', query: { id: randomTea.id } }"
							tabindex="-1"
						>
							<span
								class="bg-clip-text bg-gradient-to-r"
								:class="{
									'from-yellow-300 to-yellow-500':
										randomTea.variety === 'Зелёный',
									'from-white to-gray-200': randomTea.variety === 'Белый',
									'from-green-400 to-green-800':
										randomTea.variety === 'Травянной',
									'from-yellow-300 to-yellow-400': randomTea.variety === 'Улун',
									'from-orange-400 to-orange-600':
										randomTea.variety === 'Чёрный',
									'from-red-900 to-gray-900': randomTea.variety === 'Пуэр',
								}"
								>{{ randomTea.parenthesesName }}
							</span>
						</NuxtLink>

						<span v-else>чая</span>
					</h4>
				</div>
				<div
					class="max-lg:w-full lg:h-full lg:row-[2/-1] lg:col-[2/2]"
					id="alt-title"
				>
					<h1
						class="max-lg:hidden flex flex-col font-bold text-[5vw] text-primary leading-none"
					>
						<span>Аромат&nbsp;на</span>
						<span>каждый&nbsp;день</span>
					</h1>
					<button
						type="button"
						class="button button-primary lg:absolute max-lg:w-full"
						data-pointer-type="highlight"
						@click="navigateTo('/shop/products')"
					>
						выбрать
					</button>
				</div>
			</aside>
			<Swiper
				class="h-full w-full row-[1/-1] col-[1/-1]"
				style="z-index: -20"
				:modules="[]"
				:slides-per-view="1"
				:loop="true"
			>
				<SwiperSlide v-for="(image, index) in sliderImages" :key="index">
					<div
						class="h-full w-full !bg-no-repeat !bg-left-62%-bottom !bg-cover max-md:!bg-left-59%-bottom max-md:!bg-250%"
						:style="{
							backgroundImage: 'url(' + '/img/slider/' + image + ')',
						}"
					></div>
				</SwiperSlide>
			</Swiper>
		</section>
		<section class="container xl:container-xl">
			<h2 class="my-4 text-center text-secondary">Категории</h2>
			<div class="wrapper h-1 my-8">
				<nuxt-picture
					class="absolute left-0 w-screen"
					src="/img/decoration-horizontal.svg"
				/>
			</div>
			<MenuSwiper class="space-y-10">
				<MenuCard
					class="w-max-80 aspect-[3.75/2] rounded-xl"
					linkTo="/shop/products"
					title="Ассортимент"
					titleColor="#4f501d"
					backgroundImage="url(/img/tea1.png)"
					backgroundPosition="bottom"
					gradientOnBackground="linear-gradient(360deg, rgba(191,212,0,1) 10%, rgba(0,0,0,0) 50%)"
				>
				</MenuCard>
				<MenuCard
					class="w-max-80 aspect-[3.75/2] rounded-xl"
					linkTo="/shop/products"
					title="Акции"
					titleColor="#4f501d"
					backgroundImage="url(/img/tea2.png)"
					backgroundPosition="bottom"
					gradientOnBackground="linear-gradient(360deg, rgba(191,212,0,1) 10%, rgba(0,0,0,0) 50%)"
				>
				</MenuCard>
				<MenuCard
					class="w-max-80 aspect-[3.75/2] rounded-xl"
					linkTo="/shop/products"
					title="Новинки"
					titleColor="#4f501d"
					backgroundImage="url(/img/tea3.png)"
					backgroundPosition="bottom"
					gradientOnBackground="linear-gradient(360deg, rgba(191,212,0,1) 10%, rgba(0,0,0,0) 50%)"
				>
				</MenuCard>
			</MenuSwiper>
		</section>
		<section class="container xl:container-xl text-secondary">
			<h2 class="font-serif text-center">Как мы это делаем?</h2>
			<div class="wrapper h-1 my-8">
				<nuxt-picture
					class="absolute left-0 w-screen"
					src="/img/decoration-horizontal.svg"
				/>
			</div>
			<h1 class="my-4 font-sans font-bold text-center text-primary">
				Главный секрет приготовления
			</h1>
			<nuxt-img
				class="h-44 w-44 my-8 mx-auto border-[16px] border-primary rounded-full"
				src="/img/bg.png"
			/>
			<div class="card" @click="navigateTo('/about')">
				<h2>Мы не скрываем того, из чего именно собран наш чай.</h2>
				<hr class="h-[2px] w-[55vw]" />
				<p class="-z-10 h-50 overflow-clip">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Exercitationem, dicta, recusandae architecto delectus repellat quaerat
					velit fuga consequuntur eos nobis maxime? Distinctio deserunt minus
					culpa explicabo expedita corrupti temporibus corporis!
				</p>
				<div
					class="inline-block h-24 w-full -mt-24 bg-gradient-to-t from-primary from-30% to-transparent rounded-b-md"
				></div>
				<p class="-mt-8 font-sans text-right underline decoration-4">
					Читать дальше
				</p>
			</div>
		</section>
		<section
			class="container xl:container-xl -z-10 relative py-12 space-y-8 text-gray-700 bg-primary bg-opacity-10 overflow-clip"
		>
			<nuxt-picture
				class="absolute inset-0 left-4 w-[5vw]"
				src="/img/decoration.svg"
			></nuxt-picture>
			<h2>Подпишись на&nbsp;рассылку</h2>
			<form class="space-y-4">
				<input
					class="px-4 p-2 shadow-inner rounded-full"
					type="email"
					placeholder="Ваш email"
					required
				/>
				<button
					type="submit"
					class="px-4 p-2 text-white bg-primary2 rounded-full"
				>
					Подписаться
				</button>
			</form>
		</section>
	</main>
</template>

<script>
	export default {
		name: 'shop',
		data() {
			return {
				sliderImages: ['slide.png'],
				randomTea: null,
			}
		},
		mounted() {
			this.randomTea = this.getRandomProductByCategory('🍵')
		},
		methods: {
			getRandomProductByCategory(category) {
				if (this.products) {
					const ProductsByCategory = this.products.filter(
						(product) =>
							product.inStock &&
							product.aviableQuantity > 0 &&
							product.category === category,
					)
					const randomIndex = Math.floor(
						Math.random() * ProductsByCategory.length,
					)
					return ProductsByCategory[randomIndex]
				}
			},
		},
	}
</script>
