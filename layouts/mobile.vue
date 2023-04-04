<template>
	<!-- <CustomCursor /> -->
	<Transition name="fade" v-if="$device.isMobile">
		<div
			class="z-20 fixed h-screen w-screen p-20 grid place-content-center gap-16 grid-rows-2 bg-black bg-opacity-70"
			v-show="useScreenOrientation().orientation.value === 'landscape-primary'"
		>
			<Icon
				class="h-full w-full animate-pulse text-white"
				name="material-symbols:screen-rotation-outline"
				size="20vh"
			></Icon>
			<h1 class="font-bold text-center text-white text-2xl">
				Для лучшего пользовательсокого опыта рекомендуем использовать сайт в
				портретном режиме
			</h1>
		</div>
	</Transition>
	<MobileHeader :windowScrollY="useWindowScroll().y.value" />
	<main class="overflow-auto">
		{{ orientation }}
		<slot />
		<SubscribeNewsletter v-if="hasNewsletterBlock" />
	</main>
	<Footer v-if="hasFooter" />
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
	}
</script>
