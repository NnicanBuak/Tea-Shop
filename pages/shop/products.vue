<script setup>
	definePageMeta({
		hasHeader: true,
	})

	const route = useRoute()
	const supabase = useSupabaseClient()

	let { data: products, error: spabaseAPIError } = await supabase
		.from('products')
		.select('*')
	if (spabaseAPIError) console.error(spabaseAPIError)

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
