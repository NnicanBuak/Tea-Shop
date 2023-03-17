<script setup>
	const route = useRoute();
</script>

<template>
	<ClientOnly>
		<div
			class="-z-10 absolute top-0 left-0 h-6 w-6 bg-primary rounded-full pointer-events-none"
			id="cursor"
		></div>
	</ClientOnly>
	<div>
		<NuxtLayout :name="route.meta.layout">
			<NuxtPage></NuxtPage>
		</NuxtLayout>
	</div>
</template>

<style>
	@media (pointer: fine) {
		/* Стили для устройств с мышью */
		body {
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
		letter-spacing: -0.06em;
	}
</style>

<script>
	export default {
		mounted() {
			if (process.client) {
				this.setCursor();
			}
		},
		methods: {
			setCursor() {
				const cursor = this.$refs.cursor;
				if (!cursor) return;

				const offsetX = cursor.offsetWidth / 2;
				const offsetY = cursor.offsetHeight / 2;

				const setCursorPos = (e) => {
					cursor.style.left = e.clientX - offsetX + "px";
					cursor.style.top = e.clientY - offsetY + "px";
				};

				this.$el.addEventListener("mousemove", _.throttle(setCursorPos, 10));
			},
		},
	};
</script>
