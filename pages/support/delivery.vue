<script setup>
	useHead({ title: 'Соцветие • Доставка' })
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
			content: false,
		},
	})
</script>

<template>
	<div class="container xl:container-xl prose-xl">
		<Article :name="$route.path" />
	</div>
</template>
