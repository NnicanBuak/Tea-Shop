<script setup>
	definePageMeta({
		hasHeader: true,
		hasFooter: true,
		hasNewsletterBlock: true,
	})
</script>

<template>
	<section
		class="container-fluid mb-40 h-screen grid overflow-hidden"
		id="hero"
	>
		<div
			class="-z-10 absolute h-6 w-6 rounded-full"
			id="cursor"
			ref="cursor"
		></div>
		<aside
			class="h-screen container-xl flex flex-col justify-between items-center lg:grid grid-cols-2 grid-rows-4 gap-x-22 xl:gap-x-40 p-12 max-lg:py-[16vh] lg:p-16 xl:p-20 row-[1/-1] col-[1/-1]"
		>
			<nav class="max-lg:hidden flex flex-col lg:row-[1/1] lg:col-[2/2]">
				<div class="flex">
					<NuxtLink to="/shop/catalog">
						<button type="button">
							<Icon
								class="text-secondary"
								name="material-symbols:search"
								size="32"
							/>
						</button>
					</NuxtLink>
					<NuxtLink to="">
						<button type="button">
							<Icon
								class="text-secondary"
								name="material-symbols:shopping-bag-outline"
								size="32"
							/>
						</button>
					</NuxtLink>
				</div>
				<div class="flex">
					<NuxtLink to="/">
						<button type="button">
							<span><b>Магазин</b></span>
						</button>
					</NuxtLink>
					<NuxtLink to="/sales">
						<button type="button">
							<span>Скидки</span>
						</button>
					</NuxtLink>
					<NuxtLink to="/about">
						<button type="button">
							<span>О нас</span>
						</button>
					</NuxtLink>
					<NuxtLink to="/contacts">
						<button type="button">
							<span>Контакты</span>
						</button>
					</NuxtLink>
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
					class="lg:hidden w-[75vw]"
					id="logo"
					src="/img/logo-10.svg"
					alt=""
				/>
				<h3 class="lg:hidden w-full text-2xl font-serif text-center text-black">
					<span>Порой просто хочется начать день с чашечки&nbsp;</span>
					<NuxtLink
						v-if="randomTea?.parenthesesName"
						to="/shop/product"
						tabindex="-1"
					>
						<button
							class="px-4 py-1 inline transition transition-all font-bold bg-white hover:bg-gradient-to-r focus-visible:bg-gradient-to-r text-transparent hover:text-white focus-visible:text-white rounded-full"
							:class="{
								'hover:from-yellow-300 focus-visible:from-yellow-300 hover:to-yellow-500 focus-visible:to-yellow-500':
									randomTea.variety === 'Зелёный',
								'from-white to-gray-200': randomTea.variety === 'Белый',
								'from-green-400 to-green-800':
									randomTea.variety === 'Травянной',
								'from-yellow-300 to-yellow-400': randomTea.variety === 'Улун',
								'from-orange-400 to-orange-600': randomTea.variety === 'Чёрный',
								'from-red-900 to-gray-900': randomTea.variety === 'Пуэр',
							}"
							data-pointer-type="highlight"
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
								>{{ randomTea.parenthesesName }}</span
							>
						</button>
					</NuxtLink>
				</h3>
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
				<NuxtLink to="/shop/catalog" tabindex="-1">
					<button
						class="lg:absolute max-lg:w-full transition transition-all hover:px-4 focus-visible:px-4 py-2 lg:border-[3px] focus-visible:border-[3px] border-black text-black text-[6vw] lg:text-3xl font-bold hover:uppercase focus-visible:uppercase tracking-[-0.15vw] rounded-full max-lg:bg-primary"
						type="button"
						data-pointer-type="highlight"
					>
						<span>выбрать</span>
					</button>
				</NuxtLink>
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
</template>

<script>
	export default {
		name: 'Shop',
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
		setup() {
			onMounted(() => {
				if ('onmousemove' in window) {
					this.useCustomCursor()
				}
			})
		},
		created() {
			this.randomTea = this.getRandomProductByCategory('Чай')
		},
		mounted() {
			if ('onmousemove' in window) {
				this.useCustomCursor()
			}
		},
		methods: {
			getRandomProductByCategory(category) {
				if (!this.products) {
					return null
				}
				const ProductsByCategory = this.products.filter(
					(product) => product.category === category,
				)
				const randomIndex = Math.floor(
					Math.random() * ProductsByCategory.length,
				)
				return ProductsByCategory[randomIndex]
			},
			useCustomCursor() {
				const cursor = this.$refs.cursor
				if (!cursor) return

				const setCursorPos = (e) => {
					const offsetX = cursor.offsetWidth / 2
					const offsetY = cursor.offsetHeight / 2
					const x = e.clientX - offsetX
					const y = e.clientY + window.scrollY - offsetY
					cursor.style.transform = translate3d(`${x}px`, `${y}px`, 0)
				}

				window.addEventListener('mousemove', setCursorPos)
			},
		},
	}
</script>

<style>
	@media not all and (min-width: 600px) {
		.swiper-slide {
			background-position: left 59% bottom !important;
			background-size: 250% !important;
		}
	}
</style>
