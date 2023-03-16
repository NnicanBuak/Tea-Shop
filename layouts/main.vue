<script setup>
	const route = useRoute();
</script>

<template>
	<div>
		<header v-if="route.meta.hasHeader">HeaderHeaderHeaderHeaderHeader</header>
		<slot />
		<footer v-if="route.meta.hasFooter">FooterFooterFooterFooterFooter</footer>
	</div>
</template>
