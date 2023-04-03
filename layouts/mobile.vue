<template>
	<CustomCursor />
	<MobileHeader v-if="hasHeader" :windowScrollY="useWindowScroll().y.value" />
	<main class="overflow-auto">
		<slot />
		<section v-if="hasNewsletterBlock">Подпишись на рассылку</section>
	</main>
	<MobileFooter v-if="hasFooter" />
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
