<template>
	<header
		class="z-10 fixed h-screen w-[80vw] inset-0 transform transition transition-all bg-white"
		:class="{
			'translate-x-[100vw]': !mobileHeaderIsOpen,
			'translate-x-[30%]': mobileHeaderIsOpen,
		}"
	>
		<button
			class="-z-10 absolute transition transition-all p-3 pr-5 bg-white rounded-l-full"
			:class="{
				'top-6': isAppAtTop,
				'-left-16': isAppAtTop,
				'top-12': !isAppAtTop,
				'-left-20': !isAppAtTop,
			}"
			type="button"
			@click="toggleMobileHeader"
		>
			<Icon name="material-symbols:menu-rounded" size="8vw"></Icon>
		</button>
		<nav class=""></nav>
	</header>
	<div
		class="fixed h-screen w-screen bg-black bg-opacity-25"
		@click="toggleMobileHeader"
		v-show="mobileHeaderIsOpen"
	></div>
</template>

<script>
	export default {
		name: 'MobileHeader',
		props: {
			isAppAtTop: {
				type: Boolean,
				required: true,
			},
		},
		data() {
			return { mobileHeaderIsOpen: false }
		},
		methods: {
			toggleMobileHeader() {
				this.mobileHeaderIsOpen = !this.mobileHeaderIsOpen
			},
		},
	}
</script>
