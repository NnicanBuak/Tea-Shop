<template>
	<div>
		<!-- <CustomCursor /> -->
		<Transition name="long-fade">
			<div
				class="z-20 fixed h-screen w-screen p-20 grid place-content-center gap-16 grid-rows-2 bg-black bg-opacity-70"
				v-show="isWindowWidthNarrow"
			>
				<Icon
					class="h-full w-full animate-pulse text-white"
					name="material-symbols:width-rounded"
					size="20vh"
				></Icon>
				<h1 class="font-bold text-center text-white text-xl">
					Для лучшего пользовательского опыта рекомендуем использовать сайт в
					широкоформатном режиме
				</h1>
			</div>
		</Transition>
		<DesktopHeader v-once v-if="hasHeader"></DesktopHeader>
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
			isWindowWidthNarrow() {
				return useWindowSize().width.value <= 1024
			},
		},
	}
</script>
