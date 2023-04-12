<script setup>
	const isMounted = useMounted()
</script>
<template>
	<div v-show="isMounted">
		<header
			class="z-20 fixed inset-0 overflow-hidden h-screen w-[calc(70vw+8vw+36px)] flex items-start transition-all"
			:class="{
				['translate-x-[calc(100vw-8vw-36px)]']: !isMobileMenuOpen,
				['translate-x-[calc(30vw-8vw-36px)]']: isMobileMenuOpen,
			}"
			ref="header"
		>
			<button
				class="transition-all p-3 bg-white border-l-2 border-t-2 border-b-2 border-gray-300 shadow-md rounded-l-full"
				:class="{
					'mt-8 pr-6': isWindowScrollAtTop === true || isMobileMenuOpen,
					'ml-4 mt-[15vh] pr-6':
						isWindowScrollAtTop === false && !isMobileMenuOpen,
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
					size="8vw"
				></Icon>
			</button>
			<nav
				class="h-full w-[70vw] p-10 flex flex-col justify-around bg-white"
				@click="closeMobileHeader"
			>
				<slot />
			</nav>
		</header>
		<Transition name="fade">
			<div
				class="z-10 absolute inset-0 h-screen w-screen bg-black bg-opacity-25"
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
