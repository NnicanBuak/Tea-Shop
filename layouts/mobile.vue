<template>
	<!-- <CustomCursor /> -->
	<MobileHeader :windowScrollY="useWindowScroll().y.value" />
	<main class="overflow-auto">
		<slot />
		<subscribeNewsletter v-if="hasNewsletterBlock" />
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
