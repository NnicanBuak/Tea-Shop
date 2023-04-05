<script setup>
	definePageMeta({
		hasHeader: false,
		hasFooter: true,
		hasNewsletterBlock: true,
	})
</script>

<template>
	<section
		class="container-fluid h-screen grid"
		style="height: calc(100 * var(--vh, 1vh))"
		id="hero"
	>
		<aside
			class="h-full container-xl max-lg:container-sm flex flex-col justify-between items-center lg:grid grid-cols-2 grid-rows-4 gap-x-22 xl:gap-x-40 p-[calc(8vw+24px)] max-lg:py-[16vh] xl:p-20 row-[1/-1] col-[1/-1]"
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
					<button type="button" @click="navigateTo('/sales')">
						<span>Скидки</span>
					</button>
					<button type="button" @click="navigateTo('/about')">
						<span>О нас</span>
					</button>
					<button type="button" @click="navigateTo('/contacts')">
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
			<div class="flex flex-col justify-center items-center gap-10" id="title">
				<nuxt-picture
					class="lg:hidden w-full"
					id="logo"
					src="/img/logo-10.svg"
					alt=""
				/>
				<h1
					class="lg:hidden w-full text-[5vw] font-serif text-center text-black"
				>
					<span>Порой просто хочется начать день с чашечки&nbsp;</span>
					<button
						class="px-4 py-1 inline transition transition-all font-bold max-lg:bg-white max-lg:hover:bg-gradient-to-r max-lg:focus-visible:bg-gradient-to-r text-transparent lg:hover:text-white focus-visible:text-white lg:hover:text-black lg:focus-visible:text-black rounded-full"
						:class="{
							'from-yellow-300 to-yellow-500': randomTea.variety === 'Зелёный',
							'from-white to-gray-200': randomTea.variety === 'Белый',
							'from-green-400 to-green-800': randomTea.variety === 'Травянной',
							'from-yellow-300 to-yellow-400': randomTea.variety === 'Улун',
							'from-orange-400 to-orange-600': randomTea.variety === 'Чёрный',
							'from-red-900 to-gray-900': randomTea.variety === 'Пуэр',
						}"
						type="button"
						data-pointer-type="highlight"
						v-if="randomTea?.parenthesesName"
					>
						<NuxtLink :to="'/shop/products/' + randomTea.id" tabindex="-1">
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
					</button>
					<span v-else>чая</span>
				</h1>
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
					class="lg:absolute max-lg:w-full transition-all lg:hover:px-4 lg:focus-visible:px-4 py-[1vw] lg:hover:border-[3px] focus-visible:border-[3px] lg:border-[3px] border-black max-lg:bg-primary text-black text-[6vw] lg:text-3xl font-bold lg:hover:uppercase focus-visible:uppercase tracking-[-0.15vw] rounded-full"
					type="button"
					data-pointer-type="highlight"
					@click="navigateTo('/shop/products')"
				>
					<span>выбрать</span>
				</button>
			</div>
		</aside>
		<Swiper
			class="h-full w-full row-[1/-1] col-[1/-1]"
			style="z-index: -20"
			:modules="[SwiperAutoplay]"
			:slides-per-view="1"
			:loop="true"
			:autoplay="{
				delay: 15000,
			}"
		>
			<SwiperSlide
				class="h-full w-full max-lg:slideBGscale"
				v-for="(image, index) in sliderImages"
				:key="index"
				:style="{
					backgroundImage: 'url(' + '/img/slider/' + image + ')',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'left 62% bottom',
					backgroundSize: 'cover',
				}"
			>
			</SwiperSlide>
		</Swiper>
	</section>
	<section class="px-[calc(8vw+24px)]">
		<h1 class="my-4 font-serif text-center text-secondary text-3xl">
			Ассортимент
		</h1>
		<div class="wrapper h-1 my-8">
			<nuxt-picture
				class="absolute left-0 w-screen"
				src="/img/decoration-horizontal.svg"
			/>
		</div>
		<MenuSwiper class="space-y-10">
			<MenuCard
				class="h-40 w-max-80 rounded-xl"
				linkTo="/shop/products"
				title="Ассортимент"
				titleColor="#4f501d"
				backgroundImage="url(/img/tea1.png)"
				backgroundPosition="bottom"
				gradientOnBackground="linear-gradient(360deg, rgba(191,212,0,1) 35%, rgba(0,0,0,0) 80%)"
			>
			</MenuCard>
			<MenuCard
				class="h-40 w-max-80 rounded-xl"
				linkTo="/shop/products"
				title="Акции"
				titleColor="#4f501d"
				backgroundImage="url(/img/tea2.png)"
				backgroundPosition="bottom"
				gradientOnBackground="linear-gradient(360deg, rgba(191,212,0,1) 35%, rgba(0,0,0,0) 80%)"
			>
			</MenuCard>
			<MenuCard
				class="h-40 w-max-80 rounded-xl"
				linkTo="/shop/products"
				title="Новинки"
				titleColor="#4f501d"
				backgroundImage="url(/img/tea3.png)"
				backgroundPosition="bottom"
				gradientOnBackground="linear-gradient(360deg, rgba(191,212,0,1) 35%, rgba(0,0,0,0) 80%)"
			>
			</MenuCard>
		</MenuSwiper>
	</section>
	<section class="px-[calc(8vw+24px)] text-secondary">
		<h1 class="font-serif text-center text-3xl">Как мы это делаем?</h1>
		<div class="wrapper h-1 my-8">
			<nuxt-picture
				class="absolute left-0 w-screen"
				src="/img/decoration-horizontal.svg"
			/>
		</div>
		<h2 class="my-4 font-sans font-bold text-4xl text-center text-primary">
			Главный секрет приготовления
		</h2>
		<nuxt-img
			class="h-44 w-44 my-8 mx-auto border-[16px] border-primary rounded-full"
			src="/img/bg.png"
		/>
		<div class="p-6 bg-primary rounded-xl" @click="navigateTo('/about')">
			<h3 class="font-bold font-serif text-xl">
				Мы не скрываем того, из чего именно собран наш чай. Сейчас расскажем
				поподробней.
			</h3>
			<Divider class="w-[55vw]" />
			<p class="text-base">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum non
				debitis nam rem esse at voluptates accusamus quod libero sint? Expedita
				quod odio voluptas praesentium quas illum laborum amet voluptatibus?
			</p>
			<p class="mt-4 font-sans text-right underline decoration-4">
				Читать дальше
			</p>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'shop',
		props: {
			products: {
				type: Array,
				required: false,
			},
		},
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

<style>
	@media not all and (min-width: 600px) {
		.swiper-slide {
			/* !impartant для того что бы встроенные стили элемента переопределялись */
			background-position: left 59% bottom !important;
			background-size: 250% !important;
		}
	}
</style>
