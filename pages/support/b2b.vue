<script setup>
	useHead({ title: 'Соцветие • Для бизнеса' })
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
	<div class="container xl:container-xl prose-xl">
		<Article :name="$route.path" />
	</div>
</template>

<script>
	export default {
		name: 'b2b',
	}
</script>
