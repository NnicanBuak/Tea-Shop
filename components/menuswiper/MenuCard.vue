<template>
	<div
		class="menu-card relative bg-gradient-to-t from-primary from-10% to-60%"
		:style="{
			backgroundImage: backgroundImage
				? 'linear-gradient(360deg, #bfd400 8%, #bfd400 8%, rgba(0,0,0,0) 40%)' +
				  ', ' +
				  backgroundImage
				: 'linear-gradient(90deg, #bfd400, #4f501d)',
			backgroundRepeat: 'none',
			backgroundPosition:
				backgroundImage && backgroundImagePosition
					? backgroundImagePosition
					: 'unset',
			backgroundSize:
				backgroundImage && backgroundImageSize ? backgroundImageSize : 'cover',
		}"
		@click="navigateTo(linkTo)"
	>
		<h3
			class="absolute left-6 bottom-4 font-sans font-normal text-3xl text-white"
			v-if="title"
		>
			{{ title }}
		</h3>
		<slot />
	</div>
</template>

<script>
	export default {
		props: {
			linkTo: { type: String, required: true },
			title: { type: String, required: false },
			backgroundImage: { type: String, required: false },
			backgroundImagePosition: { type: String, required: false },
			backgroundImageSize: { type: String, required: false },
		},
	}
</script>
