<template>
	<div class="fixed">
		<header
			class="z-10 fixed overflow-hidden h-screen w-screen inset-0 flex items-start transform transition-all"
			:class="{
				'translate-x-[calc(100%-8vw-36px)]': !isMobileMenuOpen,
				'translate-x-[calc(30%-8vw-36px)]': isMobileMenuOpen,
			}"
			ref="header"
		>
			<button
				class="transition transition-all p-3 bg-white border-l-2 border-t-2 border-b-2 border-gray-300 shadow-md rounded-l-full"
				:class="{
					'mt-8 pr-6': isWindowScrollAtTop,
					'ml-4 mt-32 pr-6': !isWindowScrollAtTop,
				}"
				type="button"
				@click="toggleMobileHeader"
			>
				<Icon
					:name="
						isMobileMenuOpen
							? 'material-symbols:menu-open-rounded'
							: 'material-symbols:menu-rounded'
					"
					size="8vw"
				></Icon>
			</button>
			<nav
				class="h-full w-[70vw] p-10 flex flex-col justify-around bg-white"
				@click="toggleMobileHeader"
			>
				<NuxtLink to="/shop"
					><nuxt-picture class="w-full" src="/img/logo-08.svg"></nuxt-picture
				></NuxtLink>
				<div class="container flex flex-col gap-10">
					<div class="wrapper">
						<h1 class="-ml-2 mb-3 font-serif text-gray-400 text-3xl uppercase">
							Другое
						</h1>
						<ul class="space-y-4">
							<li class="text-2xl">
								<NuxtLink to="/shop/cart">Скидки</NuxtLink>
							</li>
							<li class="text-2xl">
								<NuxtLink to="/shop/cart">О нас</NuxtLink>
							</li>
							<li class="text-2xl">
								<NuxtLink to="/shop/cart">Контакты</NuxtLink>
							</li>
						</ul>
					</div>
					<div class="wrapper">
						<h1 class="-ml-2 mb-3 font-serif text-gray-400 text-3xl uppercase">
							Магазин
						</h1>
						<ul class="space-y-4">
							<li class="text-2xl">
								<NuxtLink to="/shop/cart">Корзина</NuxtLink>
							</li>
							<li class="text-2xl">
								<NuxtLink to="/shop/catalog">Каталог</NuxtLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
		<div
			class="-z-10 absolute h-screen w-screen bg-black bg-opacity-25"
			v-show="isMobileMenuOpen"
			@click="toggleMobileHeader"
		></div>
	</div>
</template>

<script>
	export default {
		name: 'MobileHeader',
		props: {
			windowScrollY: {
				type: Number,
				required: false,
			},
		},
		data() {
			return { isMobileMenuOpen: false }
		},
		computed: {
			isWindowScrollAtTop() {
				if (!this.windowScrollY) return true
				return this.windowScrollY < 50
			},
		},
		watch: {
			isMobileMenuOpen: (newValue) => {
				const scrollbarWidth =
					window.innerWidth - document.documentElement.clientWidth
				if (newValue === true) {
					document.body.classList.add('overflow-clip')

					if (scrollbarWidth !== 0)
						document.body.style.marginRight = `${scrollbarWidth}px`
				} else {
					document.body.classList.remove('overflow-clip')

					document.body.style.marginRight = null
				}
			},
		},
		methods: {
			toggleMobileHeader() {
				this.isMobileMenuOpen = !this.isMobileMenuOpen
			},
		},
	}
</script>
