<template>
	<div
		class="-z-10 absolute h-6 w-6 rounded-full"
		id="cursor"
		ref="cursor"
	></div>
	<DesktopHeader v-if="hasDesktopHeader"></DesktopHeader>
	<MobileHeader v-if="hasMobileHeader"></MobileHeader>
	<main>
		<slot />
		<section v-if="hasNewsletterBlock">Подпишись на рассылку</section>
	</main>
	<footer v-if="hasFooter">FooterFooterFooterFooterFooter</footer>
</template>

<script>
	export default {
		defer: true,
		data() {
			const { hasNewsletterBlock, hasFooter, hasHeader } = this.$route.meta
			return { hasNewsletterBlock, hasFooter, hasHeader }
		},
		computed: {
			hasDesktopHeader() {
				return false
				// return this.hasHeader && this.windowWidth > 1024
			},
			hasMobileHeader() {
				return true
				// return this.hasHeader && this.windowWidth <= 1024
			},
		},
	}
</script>
