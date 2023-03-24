<script setup>
	definePageMeta({
		layout: 'main',
		hasHeader: false,
		hasFooter: true,
		hasNewsletterBlock: true,
	})
</script>

<template>
	<section
		class="container-fluid mb-40 h-screen grid overflow-hidden"
		id="hero"
	>
		<aside
			class="h-screen container-xl flex gap-4 flex-col justify-around items-center lg:grid grid-cols-2 grid-rows-4 gap-x-22 xl:gap-x-40 max-lg:py-32 p-8 lg:p-16 xl:p-20 row-[1/-1] col-[1/-1]"
		>
			<div
				class="-z-10 absolute top-[-100%] left-[-100%] h-6 w-6 bg-primary rounded-full pointer-events-none"
				ref="cursor"
			></div>
			<nav class="hidden lg:flex flex-col lg:row-[1/1] lg:col-[2/2]">
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
				class="hidden lg:block h-full w-fit self-center lg:row-[1/-1] lg:col-[1/1]"
				id="alt-logo"
				src="/img/logo-14.svg"
				alt=""
			/>
			<div class="flex flex-col justify-center items-center gap-4" id="title">
				<nuxt-picture
					class="block lg:hidden w-[75vw]"
					id="logo"
					src="/img/logo-10.svg"
					alt=""
				/>
				<NuxtLink to="/shop/product" tabindex="-1">
					<h3
						class="block lg:hidden w-full text-[4.1vw] text-center text-black"
					>
						<span>
							Порой&nbsp;просто&nbsp;хочется&nbsp;начать&nbsp;день&nbsp;с&nbsp;чашечки
						</span>
						<button
							class="inline p-1 font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r rounded-full"
							:class="{
								'from-yellow-300 to-yellow-500':
									randomProduct.variety === 'Зелёный',
								'from-white to-gray-200': randomProduct.variety === 'Белый',
								'from-green-400 to-green-800':
									randomProduct.variety === 'Травянной',
								'from-yellow-300 to-yellow-400':
									randomProduct.variety === 'Улун',
								'from-orange-400 to-orange-600':
									randomProduct.variety === 'Чёрный',
								'from-red-900 to-gray-900': randomProduct.variety === 'Пуэр',
							}"
							tabindex="-1"
						>
							<span>чая {{ randomProduct.shortName }}</span>
						</button>
					</h3>
				</NuxtLink>
			</div>
			<div
				class="max-lg:w-full lg:h-full lg:row-[2/-1] lg:col-[2/2]"
				id="alt-title"
			>
				<h1
					class="hidden lg:flex flex-col font-bold text-[5vw] text-primary leading-none"
				>
					<span>Аромат&nbsp;на</span>
					<span>каждый&nbsp;день</span>
				</h1>
				<NuxtLink to="/shop/catalog" tabindex="-1">
					<button
						class="lg:absolute max-lg:w-full hover:px-4 transition-all focus-visible:px-4 py-2 border-0 hover:border-[3px] focus-visible:border-[3px] border-black text-primary lg:text-primary2 hover:text-black focus-visible:text-black text-[6vw] lg:text-3xl font-bold hover:uppercase focus-visible:uppercase tracking-[-0.15vw] rounded-full focus-visible:"
						type="button"
						data-pointer-type="highlight"
					>
						<span>выбрать чай</span>
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
				class="h-full w-full"
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
	const defaultProduct = {
		status: false,
		category: 'Неизвестно',
		variety: 'Неизвестно',
		price: '0',
		name: 'Default Product',
		shortName: 'Default',
		description: 'Описание отсутствует',
	}

	export default {
		name: 'Shop',
		props: {
			products: {
				type: Array,
				required: false,
			},
		},
		setup() {
			const isClient = useClient()

			onMounted(() => {
				if (isClient && 'onmousemove' in window) {
					this.useCustomCursor()
				}
			})
		},
		data() {
			return {
				sliderImages: ['slide.png'],
			}
		},
		computed: {
			randomProduct() {
				if (!this.products) {
					return defaultProduct
				}
				const randomIndex = Math.floor(Math.random() * this.products.length)
				return this.products[randomIndex]
			},
		},
		methods: {
			useCustomCursor() {
				const cursor = this.$refs.cursor
				if (cursor) {
					const offsetX = cursor.offsetWidth / 2
					const offsetY = cursor.offsetHeight / 2

					const setCursorPos = (e) => {
						requestAnimationFrame(() => {
							const x = e.clientX - offsetX
							const y = e.clientY + window.scrollY - offsetY
							const maxY = document.body.clientHeight - cursor.offsetHeight

							cursor.style.left = `${x}px`
							cursor.style.top = `${Math.min(y, maxY)}px`
						})
					}

					window.addEventListener('mousemove', setCursorPos)
				}
			},
		},
	}
</script>
