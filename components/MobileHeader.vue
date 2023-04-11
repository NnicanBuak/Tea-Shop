<script setup>
	const isMounted = useMounted()
</script>
<template>
	<div class="z-10 fixed" v-show="isMounted">
		<header
			class="z-10 fixed overflow-hidden h-screen w-screen inset-0 flex items-start transform transition-all"
			:class="{
				['translate-x-[calc(100%-' + iconSize + '-36px)]']: !isMobileMenuOpen,
				['translate-x-[calc(' +
				(100 - menuViaViewportWidth) +
				'%-' +
				iconSize +
				'-36px)]']: isMobileMenuOpen,
			}"
			ref="header"
		>
			<button
				class="transition-all p-3 bg-white border-l-2 border-t-2 border-b-2 border-gray-300 shadow-md rounded-l-full"
				:class="{
					'mt-8 pr-6': isWindowScrollAtTop === true,
					'ml-4 mt-[15vh] pr-6': isWindowScrollAtTop === false,
					'ml-4 pr-6': !isWindowScrollAtTop,
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
					:size="iconSize"
				></Icon>
			</button>
			<nav
				class="h-full p-10 flex flex-col justify-around bg-white"
				:class="'w-[' + menuViaViewportWidth + 'vw' + ']'"
				@click="closeMobileHeader"
			>
				<slot />
			</nav>
		</header>
		<Transition name="fade">
			<div
				class="-z-10 absolute inset-0 h-screen w-screen bg-black bg-opacity-25"
				v-show="isMobileMenuOpen"
				@click="closeMobileHeader"
			></div>
		</Transition>
	</div>
</template>

<script>
	export default {
		name: 'MobileHeader',
		props: {
			menuViaViewportWidth: {
				type: Number,
				default: 100,
			},
			iconSize: {
				type: String,
				default: '64px',
			},
			isWindowScrollAtTop: {
				type: Boolean,
				required: false,
			},
		},
		emits: {
			mobilemenuopened: null,
			mobilemenuclosed: null,
		},
		data() {
			return { isMobileMenuOpen: false }
		},
		watch: {
			isMobileMenuOpen(newValue, oldValue) {
				const scrollbarWidth =
					window.innerWidth - document.documentElement.clientWidth
				if (newValue === true) {
					if (newValue !== oldValue) this.$emit('mobilemenuopened')

					document.body.classList.add('overflow-clip')

					if (scrollbarWidth !== 0)
						document.body.style.marginRight = `${scrollbarWidth}px`
				} else {
					if (newValue !== oldValue) this.$emit('mobilemenuclosed')

					document.body.classList.remove('overflow-clip')

					document.body.style.marginRight = null
				}
			},
		},
		methods: {
			toggleMobileHeader() {
				this.isMobileMenuOpen = !this.isMobileMenuOpen
			},
			closeMobileHeader() {
				this.isMobileMenuOpen = false
			},
		},
	}
</script>
