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
				type="email"
				placeholder="Ваш email"
				required
			/>
			<button
				class="px-4 p-2 text-white bg-primary2 rounded-full"
				@click="navigateTo({ path: '/newsletter', query: { email: $event } })"
			>
				Подписаться
			</button>
		</form>
	</section>
</template>
