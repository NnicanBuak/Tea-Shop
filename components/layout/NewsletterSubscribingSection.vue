<template>
	<section
		class="container xl:container-xl -z-10 relative py-12 space-y-8 text-gray-700 bg-primary bg-opacity-10 overflow-clip"
	>
		<nuxt-picture
			class="absolute inset-0 left-4 w-[5vw]"
			src="/img/decoration.svg"
		></nuxt-picture>
		<h2>Подпишись на&nbsp;рассылку</h2>
		<form class="space-y-4">
			<input
				class="px-4 p-2 shadow-inner rounded-full"
				type="email"
				placeholder="Ваш email"
				required
			/>
			<button
				type="submit"
				class="px-4 p-2 text-white bg-primary2 rounded-full"
			>
				Подписаться
			</button>
		</form>
	</section>
</template>
