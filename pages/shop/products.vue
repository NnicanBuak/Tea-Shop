<script setup>
	definePageMeta({
		hasDesktopHeader: {
			hid: 'hasDesktopHeader',
			name: 'hasDesktopHeader',
			content: true,
		},
		hasHeaderOffset: {
			hid: 'hasHeaderOffset',
			name: 'hasHeaderOffset',
			content: true,
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: true,
		},
	})
</script>

<template>
	<div></div>
</template>

<script>
	export default {
		name: 'products',
		async asyncData() {
			const route = useRoute()
			const supabase = useSupabaseClient()

			let { data: products, error } = await supabase
				.from('products')
				.select('*')
			if (error) console.error(error)

			if (route.query?.id) {
				let { data: selectedProduct, error } = await supabase
					.from('products')
					.eq('id', route.query.id)
				if (error) console.error(error)
				else return { products, selectedProduct }
			}
			if (!error) return { products }
		},
	}
</script>
