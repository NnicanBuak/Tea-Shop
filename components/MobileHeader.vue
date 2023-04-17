<script setup>
	const isMounted = useMounted()
</script>
<template>
	<div v-show="isMounted">
		<header
			class="z-20 fixed inset-0 w-[calc(70vw+8vw+36px)] flex items-start transition-all ease-out duration-300 overflow-hidden"
			style="height: 100vh; height: calc(var(--vh, 1vh) * 100)"
			:class="{
				'flex-row-reverse': sideLeft,
				'translate-x-[calc(100vw-8vw-36px)]': !sideLeft && !isMobileMenuOpen,
				'translate-x-[calc(30vw-8vw-36px)]': !sideLeft && isMobileMenuOpen,
				'-translate-x-[70vw]': sideLeft && !isMobileMenuOpen,
				'translate-x-0': sideLeft && isMobileMenuOpen,
			}"
			ref="header"
		>
			<button
				class="transition-all duration-500 p-3 bg-white border-t-2 border-b-2 border-gray-300 shadow-md"
				:class="{
					'rounded-l-full border-l-2': !sideLeft,
					'rounded-r-full border-r-2': sideLeft,
					'mt-8 pr-6': !sideLeft && isWindowScrollAtTop && !isMobileMenuOpen,
					'ml-4 mt-[15vh] pr-2':
						!sideLeft && !isMobileMenuOpen && !isWindowScrollAtTop,
					'ml-4 pr-2': !sideLeft && (isMobileMenuOpen || !isWindowScrollAtTop),

					'pl-6 mt-8': sideLeft && isWindowScrollAtTop && !isMobileMenuOpen,
					'pl-2 mt-[15vh] mr-4 ':
						sideLeft && !isMobileMenuOpen && !isWindowScrollAtTop,
					'pl-2 mt-8 mr-4':
						sideLeft && (isMobileMenuOpen || !isWindowScrollAtTop),
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
			<nav class="z-10 h-full w-[70vw]" @click="closeMobileHeader">
				<slot v-once />
			</nav>
		</header>
		<Transition name="fade">
			<div
				class="z-10 fixed inset-0 h-screen w-screen bg-black bg-opacity-25"
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
			sideLeft: {
				type: Boolean,
				required: false,
				default: false,
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

					document.body.classList.add('overflow-hidden')

					if (scrollbarWidth !== 0)
						document.body.style.marginRight = `${scrollbarWidth}px`
				} else {
					if (newValue !== oldValue) this.$emit('mobilemenuclosed')

					document.body.classList.remove('overflow-hidden')

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
