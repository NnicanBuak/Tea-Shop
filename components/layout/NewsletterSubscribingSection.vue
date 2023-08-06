<script setup>
	const form = { email: '' }

	const handleSubmit = (e) => {
		e.preventDefault()

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
				class="px-4 p-2 shadow-inner rounded-full"
				v-model="form.email"
				type="email"
				placeholder="Ваш email"
				required
			/>
			<button
				class="px-4 p-2 text-white bg-primary2 rounded-full"
				type="button"
				@click="handleSubmit($event)"
			>
				Подписаться
			</button>
		</form>
	</section>
</template>
