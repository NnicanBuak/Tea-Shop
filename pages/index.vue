<script setup>
	useHead({ title: 'Соцветие • Магазин' })

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
			content: false,
		},
	})

	const supabase = useSupabaseClient()

	const products = ref(null)

	useAsyncData('products', async () => {
		let { data, error } = await supabase.from('products').select('*')
		console.error('[Supabase] ' + error?.message)
		products.value = data
	})
</script>

<template>
	<main class="space-y-16 overflow-auto">
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
					<h3 class="lg:hidden w-full font-normal text-black text-center">
						Порой просто хочется начать день с чашечки чая
					</h3>
				</div>
				<div
					class="flex justify-center lg:h-full lg:row-[2/-1] lg:col-[2/2]"
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
						class="button button-primary"
						data-pointer-type="highlight"
						@click="navigateTo('/shop/products')"
					>
						<Icon
							class="mr-2"
							name="material-symbols:keyboard-double-arrow-right"
							size="28"
						></Icon>
						Перейти в каталог
					</button>
				</div>
			</aside>
			<Swiper
				class="h-full w-full row-[1/-1] col-[1/-1] overflow-hidden"
				style="z-index: -20"
				:modules="[]"
				:slides-per-view="1"
				:loop="true"
			>
				<SwiperSlide v-for="(image, index) in ['slide.png']" :key="index">
					<div
						class="h-full w-full blur-[3px] !bg-no-repeat !bg-[left_62%_bottom] !bg-cover max-md:!bg-[left_59%_bottom] max-md:!bg-250%"
						:style="{
							backgroundImage: 'url(' + '/img/slider/' + image + ')',
						}"
					></div>
					<div
						class="absolute inset-0 h-screen w-screen bg-white bg-opacity-20"
					></div>
				</SwiperSlide>
			</Swiper>
		</section>
		<section class="container xl:container-xl space-y-8">
			<h2 class="my-4 text-center text-secondary">Категории</h2>
			<MenuSwiper class="space-y-6">
				<MenuCard
					class="w-max-80 aspect-[3.75/2] shadow-xl rounded-xl"
					title="Новинки"
					linkTo="/shop/products#Новинки"
					backgroundImage="url(/img/tea3.png)"
					backgroundImagePosition="bottom"
				>
				</MenuCard>
				<MenuCard
					class="w-max-80 aspect-[3.75/2] shadow-xl rounded-xl"
					title="Акции"
					linkTo="/shop/products#Акции"
					backgroundImage="url(/img/tea2.png)"
					backgroundImagePosition="bottom"
				>
				</MenuCard>
				<MenuCard
					class="w-max-80 aspect-[3.75/2] shadow-xl rounded-xl"
					title="Ассортимент"
					linkTo="/shop/products#Ассортимент"
					backgroundImage="url(/img/tea1.png)"
					backgroundImagePosition="bottom"
				>
				</MenuCard>
			</MenuSwiper>
			<CustomDivider />
		</section>
		<section
			class="container xl:container-xl relative text-secondary space-y-8"
		>
			<div
				class="-z-10 absolute top-32 left-[-50%] h-[50vh] w-[150vw] bg-primary bg-opacity-20"
			></div>
			<div class="wrapper space-y-6">
				<h2 class="font-serif text-center">Как мы это делаем?</h2>
				<nuxt-img class="h-40 w-40 mx-auto rounded-full" src="/img/bg.png" />
				<h3 class="mb-2 font-serif text-center max-md:text-xl text-[#333]">
					Главный секрет приготовления
				</h3>
			</div>
			<div
				class="card flex flex-col overflow-clip transition-max-height"
				:class="{
					'max-h-18': !isArticleOpen,
					'max-h-[50rem]': isArticleOpen,
				}"
			>
				<div class="wrapper relative flex flex-col overflow-clip">
					<Transition name="long-fade-out">
						<div
							class="z-10 absolute bottom-0 h-full w-full bg-gradient-to-t from-primary from-[5rem] to-transparent to-60%"
							v-show="!isArticleOpen"
						></div>
					</Transition>
					<div
						class="wrapper transition-max-height ease-out duration-1000"
						:class="{
							'max-h-[16rem]': !isArticleOpen,
							'max-h-[61rem]': isArticleTransitioning,
							'max-h-[60rem]': isArticleOpen && !isArticleTransitioning,
						}"
					>
						<ArticleSlider articleContentPath="/other/about" />
					</div>
				</div>
				<Transition name="fade-out">
					<p
						class="w-fit mt-4 self-end font-sans text-sm border-b-2 border-secondary leading-none"
						v-show="!isArticleOpen"
						@click="isArticleOpen = true"
					>
						Читать дальше
					</p>
				</Transition>
			</div>
			<CustomDivider />
		</section>
		<NewsletterSubscribingSection />
	</main>
</template>

<script>
	export default {
		data() {
			return {
				isArticleOpen: false,
			}
		},
		created() {
			// this.randomTea = getRandomProductByCategory('🍵')
			// function getRandomProductByCategory(category) {
			// 	if (this.products.data) {
			// 		const ProductsByCategory = this.products.filter(
			// 			(product) =>
			// 				product.inStock &&
			// 				product.aviableQuantity > 0 &&
			// 				product.category === category,
			// 		)
			// 		const randomIndex = Math.floor(
			// 			Math.random() * ProductsByCategory.length,
			// 		)
			// 		return ProductsByCategory[randomIndex]
			// 	}
			// }
		},
	}
</script>
