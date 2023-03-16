<script setup>
	const route = useRoute();
</script>

<template>
	<div>
		<header v-if="route.meta.useHeader">HeaderHeaderHeaderHeaderHeader</header>
		<slot />
		<footer v-if="route.meta.useFooter">FooterFooterFooterFooterFooter</footer>
	</div>
</template>
