<template>
	<div>
		<NuxtLoadingIndicator
			class="fixed inset-0 w-screen"
			color="#bfd400"
			:height="6"
			:throttle="2000"
		/>
		<NuxtLayout :name="layout" :hasHeader="hasHeader">
			<NuxtPage ref="page" />
		</NuxtLayout>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			const { hasHeader } = this.$route.meta
			return {
				hasHeader,
				refOnPage: null,
			}
		},
		computed: {
			layout() {
				return this.$device.isMobile ? 'mobile' : 'default'
			},
		},
		mounted() {
			this.refOnPage = this.$refs.page
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		},
	}
</script>

<style>
	@media (pointer: fine) {
		/* Стили для устройств с мышью */
		#cursor {
			background-color: #bfd400;
		}
		/* #__nuxt,
		button,
		a {
			cursor: none;
		} */
	}
	img {
		width: 100%;
	}
	button:focus-visible,
	a:focus-visible {
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

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.long-fade-enter-active,
	.long-fade-leave-active {
		transition: opacity 1s ease-in;
	}

	.long-fade-enter-from,
	.long-fade-leave-to {
		opacity: 0;
	}
</style>
