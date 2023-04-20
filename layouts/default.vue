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
				<h2 class="text-center text-white">
					Для лучшего пользовательского опыта рекомендуем использовать сайт в
					широкоформатном режиме
				</h2>
			</div>
		</Transition>

		<DesktopHeader v-if="$route.meta.hasDesktopHeader?.content"></DesktopHeader>
		<slot />
		<Footer ref="footer" />
	</div>
</template>

<script>
	export default {
		defer: true,
		computed: {
			isWindowWidthNarrow() {
				console.log(useWindowSize().width.value <= 1024)
				return useWindowSize().width.value <= 1024
			},
		},
	}
</script>
