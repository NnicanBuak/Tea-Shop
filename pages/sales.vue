<script setup>
	definePageMeta({
		hasHeader: true,
		hasNewsletterBlock: true,
	})
</script>

<template>
	<ContentDoc :path="$route.path" />
</template>

<script>
	export default {
		name: 'sales',
	}
</script>
