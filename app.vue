<script setup>
	const route = useRoute()
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
		#hero,
		a {
			cursor: none;
		}
		#hero button {
			cursor: none;
		}
	}
	img {
		width: 100%;
	}
	h1 {
		font-family: 'Montserrat', sans-serif;
	}
	p {
		font-family: Arial, Helvetica, sans-serif;
	}
	button:focus-visible {
		outline: none;
	}

	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}
</style>
