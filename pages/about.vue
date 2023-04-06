<script setup>
	definePageMeta({
		hasHeader: true,
		hasFooter: true,
		hasNewsletterBlock: true,
	})
</script>

<template>
	<ContentDoc :path="$route.path" />
</template>

<script>
	export default {
		name: 'about',
	}
</script>
