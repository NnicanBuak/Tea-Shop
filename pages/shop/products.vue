<script setup>
	definePageMeta({
		hasHeader: true,
	})

	const route = useRoute()
	const client = useSupabaseClient()

	let { data: products, error: supabaseAPIError } = await client
		.from('products')
		.select('*')
	if (supabaseAPIError) console.error(supabaseAPIError)

	defineExpose({ products })

	if (route.query?.id) {
	}
</script>

<template>
	<div></div>
</template>

<script>
	export default {
		name: 'products',
	}
</script>
