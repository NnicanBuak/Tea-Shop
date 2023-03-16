<script setup>
	const route = useRoute();
</script>

<template>
	<div>
		<header v-if="route.meta.hasHeader">HeaderHeaderHeaderHeaderHeader</header>
		<main>
			<slot />
			<section v-if="route.meta.hasNewsletterBlock">
				Подпишись на рассылку
			</section>
		</main>
		<footer v-if="route.meta.hasFooter">FooterFooterFooterFooterFooter</footer>
	</div>
</template>
