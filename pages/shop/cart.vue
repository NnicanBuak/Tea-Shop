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
		headerOffsetTitle: {
			hid: 'headerOffsetTitle',
			name: 'headerOffsetTitle',
			content: 'Корзина',
		},
		hasFooterOffset: {
			hid: 'hasFooterOffset',
			name: 'hasFooterOffset',
			content: false,
		},

		middleware: ['auth'],
	})
</script>

<template>
	<div><NewsletterSubscribingSection /></div>
</template>
