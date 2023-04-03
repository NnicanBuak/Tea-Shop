<template>
	<CustomCursor />
	<DesktopHeader
		v-if="hasHeader && useMediaQuery('(min-width: 1024px)') === true"
	></DesktopHeader>
	<MobileHeader
		v-else-if="hasHeader"
		:windowScrollY="useWindowScroll().y.value"
	/>
	<main class="overflow-auto">
		<slot />
		<section v-if="hasNewsletterBlock">Подпишись на рассылку</section>
	</main>
	<DesktopFooter
		v-if="hasFooter && useMediaQuery('(min-width: 1024px)') === true"
	/>
	<MobileFooter v-else-if="hasFooter" />
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
