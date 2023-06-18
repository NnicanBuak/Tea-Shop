<template>
	<div>
		<!-- <CustomCursor /> -->
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
