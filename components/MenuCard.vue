<template>
	<div
		class="menu-card relative"
		:style="{
			backgroundImage: backgroundImage
				? gradientOnBackground + ', ' + backgroundImage
				: 'linear-gradient(90deg, #bfd400, #4f501d)',
			backgroundRepeat: backgroundRepeat ? backgroundRepeat : 'unset',
			backgroundPosition: backgroundPosition ? backgroundPosition : 'unset',
			backgroundSize: backgroundSize ? backgroundSize : 'cover',
		}"
		@click="navigateTo(linkTo)"
	>
		<h1
			class="absolute left-6 bottom-4 font-serif font-bold text-2xl"
			:style="{ color: titleColor }"
			v-if="title"
		>
			{{ title }}
		</h1>
		<slot />
	</div>
</template>

<script>
	export default {
		props: {
			linkTo: { type: String, required: true },
			title: { type: String, required: false },
			titleColor: { type: String, required: false },
			gradientOnBackground: { type: String, required: false },
			backgroundImage: { type: String, required: false },
			backgroundRepeat: { type: String, required: false },
			backgroundPosition: { type: String, required: false },
			backgroundSize: { type: String, required: false },
		},
	}
</script>
