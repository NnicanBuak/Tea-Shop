<script setup>
	const route = useRoute();
</script>

<template>
	<div>
		<NuxtLayout :name="route.meta.layout">
			<NuxtPage></NuxtPage>
		</NuxtLayout>
	</div>
</template>

<style>
	@media (pointer: fine) {
		/* Стили для устройств с мышью */
		#hero {
			cursor: none;
		}
		#hero button {
			cursor: none;
		}
	}
	@media (pointer: coarse) {
		/* Стили для устройств с тачскринами */
		#cusror {
			display: none;
		}
	}
	img {
		width: 100%;
	}
	h1 {
		font-family: "Montserrat", sans-serif;
		font-weight: bold;
		margin-bottom: 3rem;
	}
	p {
		font-family: Arial, Helvetica, sans-serif;
	}
	button:focus-visible {
		outline: none;
	}
	button:hover,
	button:focus-visible {
		text-transform: uppercase;
		letter-spacing: -0.15vw;
	}
</style>
