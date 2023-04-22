<template>
	<div v-show="title === selectedTitle.value">
		<slot />
	</div>
</template>

<script>
	export default {
		inject: ['selectedTitle'],
		props: {
			title: { type: String, required: true },
		},
	}
</script>
