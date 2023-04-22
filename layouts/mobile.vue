<script setup>
	const supabase = useSupabaseClient()
	const profile = ref(null)

	useAsyncData('profile', async () => {
		const user = useSupabaseUser()

		if (user.value) {
			let { data, error } = await supabase
				.from('profiles')
				.select('avatar_url')
				.eq('id', user.value.id)
			if (error) console.error('[Supabase] ' + error)
			else profile.value = data
		}
		return {}
	})
</script>

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
				class="wrapper h-full pr-[2px] bg-gradient-to-b from-gray-400 via-white via-[5rem] to-gray-300 to-[calc(4rem+8vw+36px)]"
			>
				<div
					class="wrapper h-full p-10 py-16 flex flex-col flex-nowrap justify-between bg-white"
					ref="header"
				>
					<div class="flex flex-col gap-10 text-left">
						<div class="wrapper">
							<h1
								class="-ml-2 mb-3 font-serif text-gray-400 text-3xl uppercase"
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
						<div class="wrapper">
							<h1
								class="-ml-2 mb-3 font-serif text-gray-400 text-3xl uppercase"
							>
								Другое
							</h1>
							<ul class="space-y-4 text-2xl">
								<li>
									<NuxtLink to="/other/contacts">Контакты</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/other/sales">Скидки</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/other/about">О нас</NuxtLink>
								</li>
							</ul>
						</div>
					</div>
					<NuxtLink to="/shop">
						<nuxt-picture class="w-full" src="/img/logo-07.svg"></nuxt-picture>
					</NuxtLink>
					<div class="flex flex-nowrap">
						<NuxtLink class="p-2" to="/profile">
							<!-- <nuxt-img
								v-if="userData?.avatar_url"
								class="ring-4 ring-primary rounded-full"
								:src="userData?.avatar_url"
							/> -->
							<Icon
								class="text-primary2"
								name="material-symbols:settings-account-box-rounded"
								size="8vw"
							></Icon>
						</NuxtLink>
					</div>
				</div>
			</div>
		</MobileHeader>
		<div
			class="h-40 transition-max-height delay-500 duration-300 ease-out"
			:class="{
				'max-h-0': !$route.meta.hasHeaderOffset.content,
				'max-h-40': $route.meta.hasHeaderOffset.content,
			}"
		>
			<div class="container xl:container-xl h-full grid place-content-center">
				<Transition name="long-fade-delay-enter">
					<div class="wrapper" v-if="$route.path === '/shop/products'">
						<h1 class="text-[#333] text-center uppercase">
							<Icon class="inline" name="bx:leaf" size="2.5rem" />
							<span>Товары</span>
						</h1>
					</div>
				</Transition>
			</div>
		</div>
		<slot />
		<div
			class="h-40 transition-max-height delay-200 duration-500 ease-out"
			:class="{
				'max-h-0': !$route.meta.hasFooterOffset.content,
				'max-h-40': $route.meta.hasFooterOffset.content,
			}"
		></div>
		<Footer />
	</div>
</template>

<script>
	export default {
		defer: true,
		computed: {
			isScreenOrientationLandscape() {
				return useScreenOrientation().orientation.value === 'landscape-primary'
			},
			isWindowScrollAtTop() {
				const windowScroll = useWindowScroll()
				return windowScroll.y.value === 0
			},
		},
		mounted() {
			const userAgent = window.navigator.userAgent
			const isChrome =
				userAgent.includes('Chrome') && userAgent.includes('Mobile Safari')
			if (isChrome) {
				this.$refs.header.classList.add('pb-36')
			}
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
