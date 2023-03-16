<script setup>
	let hasHeader = false;
	let hasFooter = false;
</script>

<template>
	<div>
		<header v-if="hasHeader">HeaderHeaderHeaderHeaderHeader</header>
		<slot />
		<footer v-if="hasFooter">FooterFooterFooterFooterFooter</footer>
	</div>
</template>
