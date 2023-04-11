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

		<MobileHeader
			@mobilemenuopened="shiftPage"
			@mobilemenuclosed="unshiftPage"
			:isWindowScrollAtTop="isWindowScrollAtTop"
			:menuViaViewportWidth="70"
			iconSize="8vw"
		>
			<NuxtLink to="/shop">
				<nuxt-picture class="w-full" src="/img/logo-08.svg"></nuxt-picture>
			</NuxtLink>
			<div class="container flex flex-col gap-10">
				<div class="wrapper">
					<h1 class="-ml-2 mb-3 font-serif text-gray-400 text-3xl uppercase">
						Другое
					</h1>
					<ul class="space-y-4 text-2xl">
						<li>
							<NuxtLink to="/sales">Скидки</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/about">О нас</NuxtLink>
						</li>
						<li>
							<NuxtLink to="/contacts">Контакты</NuxtLink>
						</li>
					</ul>
				</div>
				<div class="wrapper">
					<h1 class="-ml-2 mb-3 font-serif text-gray-400 text-3xl uppercase">
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
		</MobileHeader>
		<div class="wrapper h-32" v-if="hasHeader"></div>
		<slot />
		<Footer ref="footer" />
	</div>
</template>

<script>
	export default {
		defer: true,
		props: {
			hasHeader: { type: Boolean, required: false },
			// page: { type: Object, required: true },
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
