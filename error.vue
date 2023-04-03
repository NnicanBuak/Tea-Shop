<script setup>
	definePageMeta({
		hasHeader: true,
		hasFooter: true,
		hasNewsletterBlock: false,
	})

	const props = defineProps({
		error: Object,
	})
	const error = useError()
</script>

<template>
	{{ error }}
	<button
		class="p-2 px-4 bg-primary2 rounded-full"
		v-if="error.statusCode === 404"
	>
		<NuxtLink to="/shop">Go Back</NuxtLink>
	</button>
</template>
