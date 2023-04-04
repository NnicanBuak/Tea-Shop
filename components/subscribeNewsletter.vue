<template>
	<section
		class="relative p-12 space-y-8 text-gray-700 bg-primary bg-opacity-10 overflow-clip"
	>
		<nuxt-picture
			class="absolute inset-0 left-4 w-[5vw]"
			src="/img/decoration.svg"
		></nuxt-picture>
		<h1 class="font-bold font-serif text-4xl">Подпишись на&nbsp;рассылку</h1>
		<form class="space-y-4" action="newsletterSubscribing">
			<input
				class="px-4 p-2 shadow-inner rounded-full"
				type="email"
				placeholder="Ваш email"
				required
			/>
			<button
				class="px-4 p-2 text-white bg-primary2 rounded-full"
				type="submit"
			>
				Подписаться
			</button>
		</form>
	</section>
</template>

<script>
	export default {}
</script>
