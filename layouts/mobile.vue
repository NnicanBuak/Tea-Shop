<template>
	<div>
		<!-- <CustomCursor /> -->
		<Transition name="long-fade">
			<div
				class="z-20 fixed h-screen w-screen p-20 grid place-content-center gap-16 grid-rows-2 bg-black bg-opacity-70"
				v-show="isScreenOrientationLandscape"
			>
				<Icon
					class="h-full w-full animate-pulse text-white"
					name="material-symbols:screen-rotation-outline"
					size="20vh"
				></Icon>
				<h1 class="font-bold text-center text-white text-2xl">
					Для лучшего пользовательского опыта рекомендуем использовать сайт в
					портретном режиме
				</h1>
			</div>
		</Transition>

		<MobileHeader :sideLeft="true" :isWindowScrollAtTop="isWindowScrollAtTop">
			<div
				class="wrapper h-full pr-[2px] bg-gradient-to-b from-gray-300 via-white via-[4rem] to-gray-300 to-[calc(4rem+8vw+36px)]"
			>
				<div
					class="wrapper h-full p-10 flex flex-col flex-nowrap justify-between bg-white"
				>
					<div class="flex flex-row-reverse flex-nowrap">
						<NuxtLink class="p-2" to="/profile">
							<nuxt-img
								v-if="userData?.avatar_url"
								class="ring-4 ring-primary rounded-full"
								:src="userData?.avatar_url"
							/>
							<Icon
								v-else
								class="text-secondary2"
								name="material-symbols:settings-account-box-rounded"
								size="8vw"
							></Icon>
						</NuxtLink>
					</div>
					<NuxtLink to="/shop">
						<nuxt-picture class="w-full" src="/img/logo-08.svg"></nuxt-picture>
					</NuxtLink>
					<div class="flex flex-col gap-10 text-right">
						<div class="wrapper">
							<h1
								class="-mr-2 mb-3 font-serif text-gray-400 text-3xl uppercase"
							>
								Другое
							</h1>
							<ul class="space-y-4 text-2xl">
								<li>
									<NuxtLink to="/other/sales">Скидки</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/other/about">О нас</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/other/contacts">Контакты</NuxtLink>
								</li>
							</ul>
						</div>
						<div class="wrapper">
							<h1
								class="-mr-2 mb-3 font-serif text-gray-400 text-3xl uppercase"
							>
								Магазин
							</h1>
							<ul class="space-y-4 text-2xl">
								<li>
									<NuxtLink to="/shop/cart">Корзина</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/shop/products">Товары</NuxtLink>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</MobileHeader>
		<div class="h-40" v-if="hasHeaderOffset"></div>
		<slot />
		<div class="h-40" v-if="hasFooterOffset"></div>
		<Footer ref="footer" />
	</div>
</template>

<script>
	export default {
		defer: true,
		inject: ['userData'],
		data() {
			const { hasHeaderOffset, hasFooterOffset } = this.$route.meta
			return {
				hasHeaderOffset: hasHeaderOffset?.content,
				hasFooterOffset: hasFooterOffset?.content,
			}
		},
		computed: {
			isScreenOrientationLandscape() {
				return useScreenOrientation().orientation.value === 'landscape-primary'
			},
			isWindowScrollAtTop() {
				const windowScroll = useWindowScroll()
				return windowScroll.y.value < 100
			},
		},
		methods: {
			// shiftPage() {
			// 	if (this.page) {
			// 		this.page.classList.add('-translate-x-[70%]')
			// 	}
			// 	this.$refs.footer.classList.add('-translate-x-[70%]')
			// },
			// unshiftPage() {
			// 	if (this.page) {
			// 		this.page.classList.remove('-translate-x-[70%]')
			// 	}
			// 	this.$refs.footer.classList.remove('-translate-x-[70%]')
			// },
		},
	}
</script>
