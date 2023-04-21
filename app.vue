<template>
	<div class="min-h-screen">
		<NuxtLoadingIndicator
			class="fixed inset-0 w-screen"
			color="#bfd400"
			:height="6"
			:throttle="2000"
		/>
		<NuxtLayout :name="layout">
			<NuxtPage />
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
