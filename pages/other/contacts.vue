<script setup>
	useHead({ title: 'Соцветие • Контакты' })
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
		headerOffsetTitle: {
			hid: 'headerOffsetTitle',
			name: 'headerOffsetTitle',
			content: 'Контакты',
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: true,
		},
	})
</script>

<template>
	<div class="container xl:container-xl prose-xl">
		<Article :name="$route.path" />
	</div>
</template>