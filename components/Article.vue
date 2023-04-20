<template>
	<ContentDoc class="prose" :path="name">
		<template #empty>
			<h1 class="text-[#333]">В статье ничего нет.</h1>
		</template>
		<template #not-found>
			<h1 class="text-[#333]">Статья не найдена.</h1>
		</template>
	</ContentDoc>
</template>

<script>
	export default {
		props: {
			name: { type: String, required: false },
		},
	}
</script>
