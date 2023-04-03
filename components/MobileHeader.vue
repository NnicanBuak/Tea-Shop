<template>
	<header
		class="z-10 fixed overflow-hidden h-screen w-screen inset-0 flex items-start transform transition-all"
		:class="{
			'translate-x-[calc(100%-8vw-24px)]': !isMobileMenuOpen,
			'translate-x-[calc(30%-8vw-24px)]': isMobileMenuOpen,
		}"
		style="height: 100vh; height: calc(100 * var(--vh, 1vh))"
		ref="header"
	>
		<button
			class="transition transition-all p-3 bg-white rounded-l-full"
			:class="{
				'ml-2 mt-6 pr-3': isWindowScrollAtTop,
				'mt-16 pr-5': !isWindowScrollAtTop,
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
				size="6vw"
			></Icon>
		</button>
		<nav
			class="h-full w-[70vw] p-10 flex flex-col justify-around bg-white"
			@click="toggleMobileHeader"
		>
			<NuxtLink to="/shop"
				><nuxt-picture class="w-full" src="/img/logo-08.svg"></nuxt-picture
			></NuxtLink>
			<div class="wrapper flex flex-col gap-10">
				<div class="wrapper">
					<h1 class="-ml-2 mb-3 font-serif text-3xl uppercase">Другое</h1>
					<ul class="space-y-4">
						<li class="text-2xl capitalize-first">
							<NuxtLink to="/shop/cart">Скидки</NuxtLink>
						</li>
						<li class="text-2xl capitalize-first">
							<NuxtLink to="/shop/cart">О нас</NuxtLink>
						</li>
						<li class="text-2xl capitalize-first">
							<NuxtLink to="/shop/cart">Контакты</NuxtLink>
						</li>
					</ul>
				</div>
				<div class="wrapper">
					<h1 class="-ml-2 mb-3 font-serif text-3xl uppercase">Магазин</h1>
					<ul class="space-y-4">
						<li class="text-2xl capitalize-first">
							<NuxtLink to="/shop/cart">Корзина</NuxtLink>
						</li>
						<li class="text-2xl capitalize-first">
							<NuxtLink to="/shop/catalog">Каталог</NuxtLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
	<div
		class="absolute h-screen w-screen bg-black bg-opacity-25"
		style="height: 100vh; height: calc(var(--vh, 1vh) * 100)"
		@click="toggleMobileHeader"
		v-show="isMobileMenuOpen"
	></div>
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
				return this.windowScrollY < 100
			},
		},
		watch: {
			isMobileMenuOpen: (newValue) => {
				const scrollbarWidth =
					window.innerWidth - document.documentElement.clientWidth
				if (newValue === true) {
					document.body.classList.add('overflow-hidden')

					if (scrollbarWidth !== 0)
						document.body.style.marginRight = `${scrollbarWidth}px`
				} else {
					document.body.classList.remove('overflow-hidden')

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
