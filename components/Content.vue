<template>
	<ContentDoc class="prose" :path="name">
		<template #empty>
			<div
				class="container xl:container-xl h-48 grid place-items-center border-8 border-primary"
			>
				<h1>Статья пуста.</h1>
			</div>
		</template>
		<template #not-found>
			<div class="container xl:container-xl grid place-items-center">
				<div class="card border-double border-[4vw] border-secondary">
					<h1 class="text-secondary">Статья не найдена.</h1>
				</div>
			</div>
		</template>
	</ContentDoc>
</template>

<script>
	export default {
		props: {
			name: { type: String, required: true },
		},
	}
</script>
