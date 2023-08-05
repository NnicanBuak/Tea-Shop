<script setup>
	const supabase = useSupabaseClient()
	const profile = ref(null)

	useAsyncData('profile', async () => {
		const user = useSupabaseUser()

		if (user.value) {
			let { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user.value.id)
			if (error) console.error('[Supabase] ' + error)
			else profile.value = data
		}
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
					Для удобства рекомендуем использовать сайт в портретном режиме
				</h1>
			</div>
		</Transition>

		<MobileHeader :sideLeft="true">
			<div
				class="wrapper h-full pr-[2px] bg-gradient-to-b from-gray-400 via-white via-[5.6rem] to-gray-300 to-[calc(5.6rem+8vw+36px)]"
				v-show="!isSearchFocused"
			>
				<div
					class="wrapper h-full p-10 py-16 flex flex-col flex-nowrap justify-between bg-white"
					ref="header"
				>
					<div class="flex flex-col gap-10 text-left">
						<div class="wrapper">
							<h1 class="mb-3 font-serif text-gray-400 text-3xl uppercase">
								Магазин
							</h1>
							<ul class="ml-3 space-y-4 text-2xl">
								<li>
									<NuxtLink to="/shop/cart">Корзина</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/shop/products">Товары</NuxtLink>
								</li>
							</ul>
						</div>
						<div class="wrapper">
							<h1 class="mb-3 font-serif text-gray-400 text-3xl uppercase">
								Другое
							</h1>
							<ul class="ml-3 space-y-4 text-2xl">
								<li>
									<NuxtLink to="/other/contacts">Контакты</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/other/sales">О скидках</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/other/about">О нас</NuxtLink>
								</li>
							</ul>
						</div>
						<div class="wrapper">
							<ul class="ml-3 space-y-4 text-2xl">
								<li>
									<NuxtLink to="/">Главная</NuxtLink>
								</li>
							</ul>
						</div>
					</div>
					<NuxtLink to="/">
						<nuxt-picture class="w-full" src="/img/logo-07.svg"></nuxt-picture>
					</NuxtLink>
					<div class="flex flex-nowrap">
						<NuxtLink
							class="p-1 ring-4 ring-primary2 rounded-full"
							to="/profile"
						>
							<nuxt-img
								class="rounded-full"
								v-if="profile?.avatar_url"
								:src="profile?.avatar_url"
							/>

							<div
								class="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
								v-else
							>
								<svg
									class="absolute w-12 h-12 text-gray-400 -left-1"
									fill="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
						</NuxtLink>
					</div>
				</div>
			</div>
		</MobileHeader>
		<div
			class="h-48 transition-max-height delay-500 duration-300 ease-out"
			:class="{
				'max-h-0': $route.meta.hasHeaderOffset?.content === false,
				'max-h-48': $route.meta.hasHeaderOffset?.content === true,
			}"
		>
			<div class="container xl:container-xl h-full grid place-content-center">
				<Transition name="long-fade-delay-enter">
					<div class="wrapper" v-if="$route.meta.headerOffsetTitle?.content">
						<h1 class="text-[#333] text-center uppercase">
							<Icon class="inline" name="bx:leaf" size="2.5rem" />
							<span>{{ $route.meta.headerOffsetTitle?.content }}</span>
						</h1>
					</div>
				</Transition>
			</div>
		</div>
		<slot @isProductsSearchFocused="handleProductsSearchFocusing" />
		<div
			class="h-40 transition-max-height delay-200 duration-500 ease-out"
			:class="{
				'max-h-0': $route.meta.hasFooterOffset?.content === false,
				'max-h-48': $route.meta.hasFooterOffset?.content === true,
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
		},
		mounted() {
			const userAgent = window.navigator.userAgent
			const isChrome =
				userAgent.includes('Chrome') && userAgent.includes('Mobile Safari')
			if (isChrome) {
				this.$refs.header.classList.add('pb-36')
			}
		},
	}
</script>
