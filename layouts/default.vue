<template>
	<div>
		<template v-if="hasHeader">
			<header v-if="hasDesktopHeader">HeaderHeaderHeaderHeaderHeader</header>
			<header v-if="hasMobileHeader"></header>
		</template>
		<main>
			<slot />
			<section v-if="hasNewsletterBlock">Подпишись на рассылку</section>
		</main>
		<footer v-if="hasFooter">FooterFooterFooterFooterFooter</footer>
	</div>
</template>

<script>
	export default {
		defer: true,
		data() {
			const { hasNewsletterBlock, hasFooter } = this.$route.meta
			return { hasNewsletterBlock, hasFooter }
		},
		computed: {
			hasHeader() {
				return this.$route.meta.hasHeader
			},
			hasDesktopHeader() {
				return this.$route.meta.hasHeader && this.windowWidth > 1024
			},
			hasMobileHeader() {
				return this.$route.meta.hasHeader && this.windowWidth <= 1024
			},
		},
	}
</script>
