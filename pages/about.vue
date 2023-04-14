<script setup>
	definePageMeta({
		hasHeader: true,
	})
</script>

<template>
	<ContentDoc class="max-lg:container prose" :path="$route.path" />
</template>

<script>
	export default {
		name: 'about',
	}
</script>
