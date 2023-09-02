<script setup>
	const form = { email: '' }

	const handleSubmit = (e) => {
		navigateTo({ path: '/newsletter', query: { email: form.email } })
	}
</script>

<template>
	<section
		class="container xl:container-xl relative py-12 text-gray-700 bg-primary bg-opacity-10 overflow-clip"
	>
		<nuxt-picture
			class="absolute inset-0 left-2 w-[5vw]"
			src="/img/decoration.svg"
		></nuxt-picture>
		<h2>Подпишись на&nbsp;рассылку</h2>
		<form class="mt-8 space-y-4">
			<input
				class="button"
				v-model="form.email"
				type="email"
				placeholder="Ваш email"
				required
			/>
			<button
				class="button button-primary2"
				type="button"
				@click="handleSubmit($event)"
			>
				Подписаться
			</button>
		</form>
	</section>
</template>
