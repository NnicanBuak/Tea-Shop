<template>
	<div>
		<!-- <CustomCursor /> -->
		<DesktopHeader v-if="hasHeader"></DesktopHeader>
		<main class="space-y-40 overflow-auto">
			<slot />
			<SubscribeNewsletter v-if="hasNewsletterBlock" />
		</main>
		<Footer v-if="hasFooter" />
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
	}
</script>
