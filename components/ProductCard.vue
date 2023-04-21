<template>
	<div
		class="card p-0 h-96 w-full flex flex-col border-2 border-gray-200 bg-white"
	>
		<nuxt-img class="h-full w-full" :src="image" />

		<div class="wrapper">test</div>
	</div>
</template>

<script>
	export default {
		name: 'ProductCard',
		props: { image: { type: String, default: '/img/pattern-02.png' } },
	}
</script>
