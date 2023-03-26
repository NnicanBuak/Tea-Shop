<script setup>
	const route = useRoute()
</script>

<template>
	<div>
		<header v-if="route.meta.hasHeader && window.innerWidth > 1024">
			HeaderHeaderHeaderHeaderHeader
		</header>
		<header v-if="route.meta.hasHeader && window.innerWidth <= 1024"></header>
		<main>
			<slot />
			<section v-if="route.meta.hasNewsletterBlock">
				Подпишись на рассылку
			</section>
		</main>
		<footer v-if="route.meta.hasFooter">FooterFooterFooterFooterFooter</footer>
	</div>
</template>

<script>
	export default {
		defer: true,
	}
</script>
