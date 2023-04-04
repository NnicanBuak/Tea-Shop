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
		<MobileHeader v-once :isWindowScrollAtTop="isWindowScrollAtTop" />
		<main class="space-y-40 overflow-auto">
			<slot />
			<SubscribeNewsletter v-once v-if="hasNewsletterBlock" />
		</main>
		<Footer v-once v-if="hasFooter" />
	</div>
</template>

<script>
	export default {
		defer: true,
		data() {
			const { hasNewsletterBlock, hasFooter, hasHeader } = this.$route.meta
			return {
				hasNewsletterBlock,
				hasFooter,
				hasHeader,
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
	}
</script>
