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

	let { data: articleData } = useAsyncData(
		'articleData',
		async () => await queryContent('/other/about').findOne(),
	)
	// const articleLinks = Array.from(articleData.body.toc.links)
	// const currentArticleLink = ref(articleLinks[0])
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
					<h3 class="lg:hidden w-full font-normal text-black text-center">
						Порой просто хочется начать день с чашечки чая
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
						class="h-full w-full !bg-no-repeat !bg-[left_62%_bottom] !bg-cover max-md:!bg-[left_59%_bottom] max-md:!bg-250%"
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
			<div class="wrapper h-44 w-44 mb-8 mx-auto p-4 bg-primary rounded-full">
				<nuxt-img class="h-full rounded-full" src="/img/bg.png" />
			</div>
			<h3 class="mb-2 font-serif text-center max-md:text-xl text-[#333]">
				Главный секрет приготовления
			</h3>
			<div class="card flex flex-col overflow-clip">
				<div class="wrapper relative flex flex-col overflow-clip">
					<Transition name="long-fade-out">
						<div
							class="absolute bottom-0 h-full w-full bg-gradient-to-t from-primary from-20% to-transparent to-50%"
							v-show="!isArticleOpen"
						></div>
					</Transition>
					<div
						class="wrapper transition-max-height ease-out duration-1000"
						:class="{
							'max-h-96': !isArticleOpen,
							'max-h-[60rem]': isArticleOpen,
						}"
					>
						<div
							class="wrapper"
							v-for="link in articleData.body.toc.links"
							:key="link.id"
						>
							<Transition name="long-fade-in-right-out-left-in-out">
								<div class="wrapper" v-show="articleData">
									<h1 class="text-secondary">
										<a :href="'#' + link.id">
											{{ link.text }}
										</a>
									</h1>
									<hr />
									<p>
										{{
											articleData.body.children[
												Number(
													getKeyByValue(
														articleData.body.children,
														findInObject(articleData.body.children, 'props', {
															id: link.id,
														}),
													),
												) + 1
											].children[0].value
										}}
									</p>
								</div>
							</Transition>
						</div>
						<hr class="h-[4px]" />
						<nav class="flex flex-row-reverse">
							<button type="button" class="p-2">
								<Icon
									class="active:bg-secondary active:text-primary rounded-full"
									name="material-symbols:arrow-circle-right-outline-rounded"
									size="10vw"
								/>
							</button>
							<button type="button" class="p-2">
								<Icon
									class="active:bg-secondary active:text-primary rounded-full"
									name="material-symbols:arrow-circle-left-outline-rounded"
									size="10vw"
								/>
							</button>
						</nav>
					</div>
				</div>
				<Transition name="fade-out">
					<p
						class="w-fit mt-4 self-end font-sans font-sm border-b-4 border-secondary leading-none"
						v-show="!isArticleOpen"
						@click.prevent="isArticleOpen = true"
					>
						Читать дальше
					</p>
				</Transition>
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
				isArticleOpen: false,
			}
		},
		async asyncData() {
			// const supabase = useSupabaseClient()

			// const { data: products, error } = await supabase
			// 	.from('products')
			// 	.select('*')
			// if (error) console.error(error)
			// else return { products }

			return {}
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
			findInObject(object, key, value) {
				if (
					object.hasOwnProperty(key) &&
					JSON.stringify(object[key]) === JSON.stringify(value)
				) {
					return object // Возвращаем исходный объект, если найдена пара ключ-значение
				}
				for (let prop in object) {
					if (object.hasOwnProperty(prop) && typeof object[prop] === 'object') {
						let result = this.findInObject(object[prop], key, value) // Рекурсивно вызываем функцию для поиска пары ключ-значение в дочернем объекте
						if (result) {
							return result // Возвращаем дочерний объект, если найдена пара ключ-значение
						}
					}
				}
			},
			getKeyByValue(object, value) {
				for (let key in object) {
					if (object.hasOwnProperty(key) && object[key] === value) {
						return key
					}
				}
				return null // Если значение не найдено, вернем null
			},
		},
	}
</script>
