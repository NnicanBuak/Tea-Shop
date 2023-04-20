<template>
	<div class="min-h-screen">
		<NuxtLoadingIndicator
			class="fixed inset-0 w-screen"
			color="#bfd400"
			:height="6"
			:throttle="2000"
		/>
		<NuxtLayout :name="layout">
			<NuxtPage ref="page" />
		</NuxtLayout>
	</div>
</template>

<script>
	export default {
		name: 'app',
		computed: {
			layout() {
				return this.$device.isMobile ? 'mobile' : 'default'
			},
		},
		mounted() {
			const userAgent = window.navigator.userAgent
			const isChrome =
				userAgent.includes('Chrome') && userAgent.includes('Mobile Safari')

			if (isChrome) {
				let vh = window.innerHeight * 0.01
				document.documentElement.style.setProperty('--vh', `${vh}px`)
			}
		},
	}
</script>

<style>
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

	.fade-out-enter-active,
	.fade-out-leave-active {
		transition: opacity 0.2s ease-out;
	}

	.fade-out-enter-from,
	.fade-out-leave-to {
		opacity: 0;
	}

	.fade-out-left-in-out-enter-active,
	.fade-out-left-in-out-leave-active {
		transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
	}

	.fade-out-left-in-out-enter-from,
	.fade-out-left-in-out-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	}

	.long-fade-enter-active,
	.long-fade-leave-active {
		transition: opacity 1s ease-in;
	}

	.long-fade-enter-from,
	.long-fade-leave-to {
		opacity: 0;
	}

	.long-fade-out-enter-active,
	.long-fade-out-leave-active {
		transition: opacity 1s ease-out;
	}

	.long-fade-out-enter-from,
	.long-fade-out-leave-to {
		opacity: 0;
	}

	.long-fade-out-left-in-out-enter-active,
	.long-fade-out-left-in-out-leave-active {
		transition: opacity 1s ease-out, transform 1s ease-in;
	}

	.long-fade-out-left-in-out-enter-from,
	.long-fade-out-left-in-out-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	}

	.long-fade-in-right-out-left-in-out-enter-active,
	.long-fade-in-right-out-left-in-out-leave-active {
		transition: opacity 1s ease-in-out, transform 1s ease-in-out;
	}

	.long-fade-in-right-out-left-in-out-enter-from {
		opacity: 0;
		transform: translateX(100%);
	}
	.long-fade-in-right-out-left-in-out-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	}
</style>
