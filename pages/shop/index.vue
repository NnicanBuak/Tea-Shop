<script setup>
	definePageMeta({
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
			class="h-screen container-xl flex flex-col justify-between items-center lg:grid grid-cols-2 grid-rows-4 gap-x-22 xl:gap-x-40 p-12 max-lg:py-32 lg:p-16 xl:p-20 row-[1/-1] col-[1/-1]"
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
			<div class="flex flex-col justify-center items-center gap-4" id="title">
				<nuxt-picture
					class="lg:hidden w-[75vw]"
					id="logo"
					src="/img/logo-10.svg"
					alt=""
				/>
				<h3 class="lg:hidden w-full text-2xl font-serif text-center text-black">
					<span>Порой просто хочется начать день с чашечки чая&nbsp;</span>
					<NuxtLink v-if="randomTea" to="/shop/product" tabindex="-1">
						<button
							class="px-4 py-1 inline text-transparent font-bold bg-clip-text bg-gradient-to-r rounded-full relative"
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
							tabindex="-1"
						>
							<span>{{ nameToParentheses(randomTea.shortName) }}</span>
							<span class="-z-10 absolute inset-0 bg-white rounded-full"></span>
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
						class="lg:absolute max-lg:w-full hover:px-4 transition-all focus-visible:px-4 py-2 border-[3px] focus-visible:border-[3px] border-primary2 hover:border-black focus-visible:border-black text-primary2 hover:text-black focus-visible:text-black text-[6vw] lg:text-3xl font-bold hover:uppercase focus-visible:uppercase tracking-[-0.15vw] rounded-full focus-visible:"
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
		name: 'shop',
		props: {
			products: {
				type: Array,
				required: false,
			},
		},
		setup() {
			onMounted(() => {
				if ('onmousemove' in window) {
					this.useCustomCursor()
				}
			})
		},
		data() {
			return {
				sliderImages: ['slide.png'],
				randomTea: this.getRandomProductByCategory('Чай'),
			}
		},
		mounted() {
			window.addEventListener('resize', this.handleResize)
			this.handleResize()
		},
		methods: {
			handleResize() {
				this.togglePageHeader()
			},
			togglePageHeader() {
				this.$route.meta.hasHeader = !(window.innerWidth > 1024)
			},
			nameToParentheses(teaName) {
				return teaName
			},
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
				if (cursor) {
					const offsetX = cursor.offsetWidth / 2
					const offsetY = cursor.offsetHeight / 2

					const setCursorPos = (e) => {
						requestAnimationFrame(() => {
							const x = e.clientX - offsetX
							const y = e.clientY + window.scrollY - offsetY
							// const maxY = document.body.clientHeight - cursor.offsetHeight

							cursor.style.left = `${x}px`
							cursor.style.top = `${y}px`
						})
					}

					window.addEventListener('mousemove', setCursorPos)
				}
			},
		},
	}
</script>

<style>
	@media not all and (min-width: 1024px) {
		.swiper-slide {
			background-position: left 59% bottom !important;
			background-size: 250% !important;
		}
	}
</style>
